import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, TextField, IconButton, CircularProgress, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import axios from 'axios';

export default function ChatInterface({ quickQuery, onEscalate }) {
    const [messages, setMessages] = useState(() => {
        const saved = sessionStorage.getItem('changi_chat_messages');
        return saved ? JSON.parse(saved) : [
            { sender: 'bot', text: 'Hello! I am ChangiAI, your airport digital concierge. How can I help you today?' }
        ];
    });
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        sessionStorage.setItem('changi_chat_messages', JSON.stringify(messages));
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (quickQuery) {
            handleSend(quickQuery);
        }
    }, [quickQuery]);

    const handleSend = async (textOverride) => {
        const text = textOverride || input;
        if (!text.trim()) return;

        const userMsg = { sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${apiUrl}/api/chat`, {
                message: text,
                chatHistory: messages.filter(m => m.sender !== 'bot' || !m.text.includes('[ESCALATE_VONCIERGE]'))
            });

            const reply = response.data.reply;
            
            if (reply.includes('[ESCALATE_VONCIERGE]')) {
                const cleanReply = reply.replace('[ESCALATE_VONCIERGE]', '').trim();
                if (cleanReply) {
                    setMessages(prev => [...prev, { sender: 'bot', text: cleanReply, isEscalation: true }]);
                } else {
                    setMessages(prev => [...prev, { sender: 'bot', text: 'I need to connect you with a human agent.', isEscalation: true }]);
                }
            } else {
                setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "I'm having trouble connecting to the network right now. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* Header */}
            <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SmartToyIcon color="info" /> ChangiAI Assistant
                </Typography>
            </Box>

            {/* Messages Area */}
            <Box sx={{ flex: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {messages.map((msg, idx) => (
                    <Box 
                        key={idx} 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                            gap: 1.5,
                            alignItems: 'flex-start'
                        }}
                    >
                        {msg.sender === 'user' ? 
                            <PersonIcon sx={{ color: 'text.secondary', mt: 0.5 }} /> : 
                            <SmartToyIcon color="info" sx={{ mt: 0.5 }} />
                        }
                        <Paper 
                            elevation={0}
                            sx={{
                                p: 1.5,
                                px: 2,
                                maxWidth: '80%',
                                bgcolor: msg.sender === 'user' ? 'primary.main' : 'rgba(255,255,255,0.05)',
                                color: msg.sender === 'user' ? '#000' : '#fff',
                                borderRadius: 3,
                                borderTopRightRadius: msg.sender === 'user' ? 4 : 3,
                                borderTopLeftRadius: msg.sender === 'bot' ? 4 : 3,
                            }}
                        >
                            <Typography variant="body1">{msg.text}</Typography>
                            {msg.isEscalation && (
                                <Button 
                                    variant="contained" 
                                    color="info" 
                                    startIcon={<VideocamIcon />}
                                    onClick={onEscalate}
                                    sx={{ mt: 2, borderRadius: 2 }}
                                >
                                    Start Video Call
                                </Button>
                            )}
                        </Paper>
                    </Box>
                ))}
                {isLoading && (
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                        <SmartToyIcon color="info" />
                        <CircularProgress size={20} color="info" />
                    </Box>
                )}
                <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(0,0,0,0.1)' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField 
                        fullWidth 
                        variant="outlined" 
                        placeholder="Type your question..." 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading}
                        size="small"
                        sx={{ 
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 4,
                                bgcolor: 'rgba(0,0,0,0.2)'
                            }
                        }}
                    />
                    <IconButton 
                        color="primary" 
                        onClick={() => handleSend()}
                        disabled={isLoading || !input.trim()}
                        sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}
