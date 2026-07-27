import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    command: { type: String, required: true },
    status: { type: String, enum: ['pending', 'running', 'completed', 'failed'], default: 'pending' },
    totalSpent: { type: Number, default: 0 },
    stepsCompleted: { type: Number, default: 0 },
    report: { type: Object, default: {} }
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);