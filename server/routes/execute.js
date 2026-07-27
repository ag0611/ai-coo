import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Session from '../models/Session.js';
import Transaction from '../models/Transaction.js';
import Policy from '../models/Policy.js';
import researchAgent from '../agents/researchAgent.js';
import competitorAgent from '../agents/competitorAgent.js';
import adCopyAgent from '../agents/adCopyAgent.js';
import actionPlanAgent from '../agents/actionPlanAgent.js';
import x402Client from '../utils/x402Client.js';

const router = express.Router();

const runStep = async (sessionId, step, agentName, policy, agentFn) => {
    const sessionTransactions = await Transaction.find({ sessionId });
    const totalSpent = sessionTransactions.reduce((sum, t) => sum + t.amount, 0);

    if (policy.blockIfBudgetExceeded && totalSpent + 0.01 > policy.maxSpendPerSession) {
        throw new Error(`Budget exceeded. Max allowed: $${policy.maxSpendPerSession} USDC.`);
    }

    if (!policy.allowedMerchants.includes(agentName)) {
        throw new Error(`Agent "${agentName}" not in allowlist.`);
    }

    const output = await agentFn();
    const payment = await x402Client(agentName, 0.01);

    await Transaction.create({
        sessionId,
        step,
        agentName,
        amount: 0.01,
        currency: 'USDC',
        status: payment.success ? 'paid' : 'failed',
        txHash: payment.txHash
    });

    await Session.findOneAndUpdate(
        { sessionId },
        { $inc: { totalSpent: 0.01, stepsCompleted: 1 } }
    );

    return { output, payment };
};

router.post('/', async (req, res, next) => {
    try {
        const { command } = req.body;

        if (!command || command.trim() === '') {
            return res.status(400).json({ success: false, message: 'Business command is required.' });
        }

        const sessionId = uuidv4();

        let policy = await Policy.findOne();
        if (!policy) policy = await Policy.create({});

        await Session.create({ sessionId, command, status: 'running' });

        const steps = [];
        let context = '';

        const step1 = await runStep(sessionId, 1, 'research-agent', policy, () => researchAgent(command));
        context += `Market Research: ${step1.output}\n\n`;
        steps.push({ step: 1, agent: 'Market Research', output: step1.output, payment: step1.payment });

        const step2 = await runStep(sessionId, 2, 'competitor-agent', policy, () => competitorAgent(command, context));
        context += `Competitor Analysis: ${step2.output}\n\n`;
        steps.push({ step: 2, agent: 'Competitor Analysis', output: step2.output, payment: step2.payment });

        const step3 = await runStep(sessionId, 3, 'adcopy-agent', policy, () => adCopyAgent(command, context));
        context += `Ad Copy: ${step3.output}\n\n`;
        steps.push({ step: 3, agent: 'Ad Copy', output: step3.output, payment: step3.payment });

        const step4 = await runStep(sessionId, 4, 'actionplan-agent', policy, () => actionPlanAgent(command, context));
        steps.push({ step: 4, agent: 'Action Plan', output: step4.output, payment: step4.payment });

        const report = {
            command,
            summary: `AI COO executed 4 autonomous agent steps for: "${command}"`,
            steps,
            totalSpent: 0.04,
            currency: 'USDC'
        };

        await Session.findOneAndUpdate({ sessionId }, { status: 'completed', report });

        res.json({ success: true, sessionId, steps, report });

    } catch (error) {
        next(error);
    }
});

export default router;