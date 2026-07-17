import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D4AF37', // Champagne Gold
        },
        secondary: {
            main: '#6F2C5C', // Changi Burgundy
        },
        background: {
            default: '#121212', // Deep Charcoal
            paper: 'rgba(30, 30, 30, 0.6)', // Glassmorphism base
        },
        info: {
            main: '#00E5FF', // Cyber Teal for active AI elements
        }
    },
    typography: {
        fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        body1: {
            fontSize: '1.1rem',
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                }
            }
        }
    }
});

export default theme;
