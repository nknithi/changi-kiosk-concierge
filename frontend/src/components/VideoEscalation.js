import React, { useEffect, useState, useRef } from 'react';
import { Dialog, DialogContent, Box, Typography, IconButton, CircularProgress, Slide } from '@mui/material';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VideoEscalation({ open, onClose }) {
    const [status, setStatus] = useState('Connecting to Voncierge Live Support...');
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        if (open) {
            setStatus('Connecting to Voncierge Live Support...');
            
            // Simulate connection delay
            const timer = setTimeout(() => {
                setStatus('Connected to Agent Sarah');
                
                // Request camera access to mock the real video call experience
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                        .then(currentStream => {
                            setStream(currentStream);
                        })
                        .catch(err => console.log("Camera access denied/unavailable", err));
                }
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            // Clean up camera stream when closed
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // Set stream source once the video element mounts
    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const handleHangUp = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        onClose();
    };

    return (
        <Dialog 
            fullScreen 
            open={open} 
            TransitionComponent={Transition}
            PaperProps={{
                sx: {
                    bgcolor: 'rgba(0, 0, 0, 0.95)',
                    backdropFilter: 'blur(20px)',
                }
            }}
        >
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0, position: 'relative' }}>
                
                {/* Center Call Frame (Zoom/Voncierge style) */}
                <Box 
                    sx={{
                        width: { xs: '95%', sm: '85%', md: '75%', lg: '70%' },
                        aspectRatio: '16/9',
                        maxHeight: '70vh',
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundImage: status.includes('Connected') 
                            ? 'url(https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=800&h=450)' 
                            : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    {!status.includes('Connected') && (
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress size={60} thickness={4} sx={{ color: '#00E5FF', mb: 3 }} />
                            <Typography variant="h5" color="white">{status}</Typography>
                        </Box>
                    )}

                    {/* User Picture-in-Picture (Webcam) - Positioned relative to the call frame */}
                    {stream && (
                        <Box 
                            sx={{
                                position: 'absolute',
                                bottom: 20,
                                right: 20,
                                width: { xs: 100, sm: 160, md: 200 },
                                aspectRatio: '3/2',
                                bgcolor: '#000',
                                borderRadius: 2,
                                overflow: 'hidden',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                                border: '2px solid rgba(255,255,255,0.2)'
                            }}
                        >
                            <video 
                                ref={videoRef} 
                                autoPlay 
                                playsInline 
                                muted
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
                            />
                        </Box>
                    )}
                </Box>

                {/* Status Bar */}
                <Box sx={{ position: 'absolute', top: 40, left: 40 }}>
                    <Typography variant="h4" color="white" fontWeight="bold">Voncierge Video Support</Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                        {status.includes('Connected') ? 'Live • Agent Sarah' : 'Ringing...'}
                    </Typography>
                </Box>

                {/* Call Controls */}
                <Box 
                    sx={{
                        position: 'absolute',
                        bottom: 40,
                        display: 'flex',
                        gap: 3,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        p: 2,
                        borderRadius: 10,
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                        <MicIcon fontSize="large" />
                    </IconButton>
                    <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                        <VideocamIcon fontSize="large" />
                    </IconButton>
                    <IconButton 
                        onClick={handleHangUp}
                        sx={{ bgcolor: '#f44336', color: 'white', '&:hover': { bgcolor: '#d32f2f' } }}
                    >
                        <CallEndIcon fontSize="large" />
                    </IconButton>
                </Box>

            </DialogContent>
        </Dialog>
    );
}
