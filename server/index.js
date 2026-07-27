import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

import executeRoute from './routes/execute.js';
import sessionRoute from './routes/session.js';
import policyRoute from './routes/policy.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Security
app.use(helmet());
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.'
});
app.use(limiter);

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/execute', executeRoute);
app.use('/api/session', sessionRoute);
app.use('/api/policy', policyRoute);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'AI COO Server running' });
});

// Error handler
app.use(errorHandler);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { family: 4 })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    });