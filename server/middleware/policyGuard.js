import Policy from '../models/Policy.js';
import Transaction from '../models/Transaction.js';

const policyGuard = async (req, res, next) => {
    try {
        const { sessionId, agentName, amount } = req.body;

        // Fetch policy from DB
        let policy = await Policy.findOne();
        if (!policy) {
            policy = await Policy.create({});
        }

        // 1. Check merchant allowlist
        if (!policy.allowedMerchants.includes(agentName)) {
            return res.status(403).json({
                success: false,
                blocked: true,
                reason: `Agent "${agentName}" is not in the allowed merchants list.`
            });
        }

        // 2. Check session total spend
        const sessionTransactions = await Transaction.find({ sessionId });
        const totalSpent = sessionTransactions.reduce((sum, t) => sum + t.amount, 0);

        if (policy.blockIfBudgetExceeded && totalSpent + amount > policy.maxSpendPerSession) {
            return res.status(403).json({
                success: false,
                blocked: true,
                reason: `Session budget exceeded. Max allowed: $${policy.maxSpendPerSession} USDC.`
            });
        }

        // 3. Check transaction frequency (per minute)
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        const recentTransactions = await Transaction.find({
            sessionId,
            createdAt: { $gte: oneMinuteAgo }
        });

        if (recentTransactions.length >= policy.maxTransactionsPerMinute) {
            return res.status(403).json({
                success: false,
                blocked: true,
                reason: `Transaction frequency limit exceeded. Max ${policy.maxTransactionsPerMinute} per minute.`
            });
        }

        // All checks passed
        req.policy = policy;
        req.totalSpent = totalSpent;
        next();

    } catch (error) {
        next(error);
    }
};

export default policyGuard;