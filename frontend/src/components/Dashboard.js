import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Stack, Chip, Divider } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import TrainIcon from '@mui/icons-material/Train';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function Dashboard({ onQuickAction }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const quickActions = [
        { label: 'Find Taxi', icon: <DirectionsCarIcon />, query: 'Where are the taxi stands located?' },
        { label: 'MRT Stations', icon: <TrainIcon />, query: 'How do I get to the MRT station?' },
        { label: 'Pharmacy', icon: <LocalPharmacyIcon />, query: 'Is there a pharmacy nearby?' },
        { label: 'Flight SQ108', icon: <FlightTakeoffIcon />, query: 'What is the status of Flight SQ108?' },
    ];

    const flights = [
        { flight: 'SQ108', dest: 'Bali', time: '17:30', status: 'On-Time', color: '#4caf50' },
        { flight: 'TR405', dest: 'Bangkok', time: '18:15', status: 'Delayed', color: '#f44336' },
        { flight: 'EK405', dest: 'Dubai', time: '21:00', status: 'On-Time', color: '#4caf50' },
    ];

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
            
            {/* Header / Brand */}
            <Box>
                <Typography variant="h4" color="primary" fontWeight="bold">
                    ChangiAI Kiosk
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Powered by Voncierge
                </Typography>
            </Box>

            {/* Live Stats Board */}
            <Stack direction="row" spacing={2}>
                <Paper sx={{ p: 2, flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccessTimeIcon color="primary" fontSize="large" />
                    <Box>
                        <Typography variant="body2" color="text.secondary">Local Time</Typography>
                        <Typography variant="h6">{time.toLocaleTimeString('en-SG', { timeZone: 'Asia/Singapore' })}</Typography>
                    </Box>
                </Paper>
                <Paper sx={{ p: 2, flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <WbSunnyIcon sx={{ color: '#FFB300' }} fontSize="large" />
                    <Box>
                        <Typography variant="body2" color="text.secondary">Weather</Typography>
                        <Typography variant="h6">31°C, Clear</Typography>
                    </Box>
                </Paper>
            </Stack>

            {/* Flight Board */}
            <Paper sx={{ p: 3, flex: 1 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FlightTakeoffIcon /> Departures
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                    {flights.map((f, idx) => (
                        <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">{f.flight}</Typography>
                                <Typography variant="body2" color="text.secondary">to {f.dest}</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="subtitle1">{f.time}</Typography>
                                <Typography variant="body2" sx={{ color: f.color, fontWeight: 'bold' }}>{f.status}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Paper>

            {/* Quick Actions */}
            <Box>
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Quick Questions
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {quickActions.map((action, idx) => (
                        <Chip 
                            key={idx}
                            icon={action.icon}
                            label={action.label}
                            onClick={() => onQuickAction(action.query)}
                            color="secondary"
                            variant="outlined"
                            clickable
                            sx={{ '&:hover': { backgroundColor: 'rgba(111, 44, 92, 0.2)' } }}
                        />
                    ))}
                </Box>
            </Box>

        </Box>
    );
}
