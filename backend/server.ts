import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { handleChat } from './chatController.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





app.post('/api/chat', handleChat);

// Basic Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'ChangiAI backend is running.' });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
