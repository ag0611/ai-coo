import express from 'express';
import Session from '../models/Session.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.get('/:sessionId', async (req, res, next) => {
    try {
        const { sessionId } = req.params;

        const session = await Session.findOne({ sessionId });
        if (!session) {
            return res.status(404).json({ success: false, message: 'Session not found.' });
        }

        const transactions = await Transaction.find({ sessionId });

        res.json({ success: true, session, transactions });

    } catch (error) {
        next(error);
    }
});

export default router;