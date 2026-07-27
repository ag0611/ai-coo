import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    step: { type: Number, required: true },
    agentName: { type: String, required: true },
    amount: { type: Number, default: 0.01 },
    currency: { type: String, default: 'USDC' },
    status: { type: String, enum: ['paid', 'blocked', 'failed'], default: 'paid' },
    txHash: { type: String, default: '' },
    blockReason: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);