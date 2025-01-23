import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import resultRoute from './Routes/ResultRoute.js';
import dotenv from 'dotenv';
import DataToJson from './Routes/DataToJson.js';
import Verification from './Routes/Verification.js';

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGO_CONN;
mongoose
    .connect(mongoURI)
    .then(() => console.log('MongoDB connection established successfully'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => {
    res.json('PONG');
});
app.use('/result', resultRoute);
app.use('/datatoJson', DataToJson);
app.use('/verification', Verification);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred!' });
    next();
});

// Export for Vercel Deployment
export default app;
