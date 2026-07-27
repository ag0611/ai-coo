import express from 'express';
import Policy from '../models/Policy.js';

const router = express.Router();

// Get current policy
router.get('/', async (req, res, next) => {
    try {
        let policy = await Policy.findOne();
        if (!policy) policy = await Policy.create({});
        res.json({ success: true, policy });
    } catch (error) {
        next(error);
    }
});

// Update policy
router.post('/', async (req, res, next) => {
    try {
        const { maxSpendPerSession, maxTransactionsPerMinute, allowedMerchants, blockIfBudgetExceeded } = req.body;

        let policy = await Policy.findOne();
        if (!policy) policy = await Policy.create({});

        if (maxSpendPerSession !== undefined) policy.maxSpendPerSession = maxSpendPerSession;
        if (maxTransactionsPerMinute !== undefined) policy.maxTransactionsPerMinute = maxTransactionsPerMinute;
        if (allowedMerchants !== undefined) policy.allowedMerchants = allowedMerchants;
        if (blockIfBudgetExceeded !== undefined) policy.blockIfBudgetExceeded = blockIfBudgetExceeded;

        await policy.save();

        res.json({ success: true, policy });
    } catch (error) {
        next(error);
    }
});

export default router;  