import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
    maxSpendPerSession: { type: Number, default: 0.10 },
    maxTransactionsPerMinute: { type: Number, default: 10 },
    allowedMerchants: {
        type: [String],
        default: ['research-agent', 'competitor-agent', 'adcopy-agent', 'actionplan-agent']
    },
    blockIfBudgetExceeded: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Policy', policySchema);