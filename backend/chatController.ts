import type { Request, Response } from 'express';
import axios from 'axios';
import { AIRPORT_KNOWLEDGE } from './knowledgeBase.js';

const SYSTEM_PROMPT = `
You are ChangiAI, a smart digital assistant at the airport. Use the following context to answer passenger questions. 
If the information is not in the context, politely state you don't know and offer to connect them to a human agent.

Context:
${AIRPORT_KNOWLEDGE}

Instructions:
- Be concise and friendly.
- Provide clear answers using only the context provided.
- If the passenger asks to speak to a human, mentions a critical issue (e.g., lost passport, medical emergency, security issue), or if you cannot answer their question with the provided context, you must include the exact token "[ESCALATE_VONCIERGE]" in your response. When doing this, explicitly ask the user to "click the Start Video Call button below" to connect with a live Voncierge agent. Do not say "please hold" or act like you are transferring them yourself.
`;

export const handleChat = async (req: Request, res: Response): Promise<void> => {
    const { message, chatHistory } = req.body;

    if (!message) {
        res.status(400).json({ error: 'Message is required' });
        return;
    }

    try {

        const geminiApiKey = process.env.GEMINI_API_KEY;
        if (!geminiApiKey) {
            res.status(500).json({ error: 'GEMINI_API_KEY is not set' });
            return;
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${geminiApiKey}`;

        const historyContents = (chatHistory || []).map((msg: any) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const contents = [
            { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
            { role: 'model', parts: [{ text: "Understood. I will follow these instructions and use the provided context." }] },
            ...historyContents,
            { role: 'user', parts: [{ text: message }] }
        ];

        const response = await axios.post(url, { contents });

        if (response.data && response.data.candidates && response.data.candidates[0]) {
            const reply = response.data.candidates[0].content.parts[0].text;
            res.json({ reply });
        } else {
            console.error('Unexpected Gemini Response format:', response.data);
            res.status(500).json({ error: 'Failed to parse AI response' });
        }

    } catch (error: any) {
        console.error('AI API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to communicate with AI service' });
    }
};
