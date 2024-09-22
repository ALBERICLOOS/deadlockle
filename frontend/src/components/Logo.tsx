import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';



const LogoText = styled(Typography)(({ theme }) => ({
    fontFamily: '"Orbitron", sans-serif',
    color: '#fff',
    fontSize: '3rem',
    letterSpacing: '0.1rem',
    textTransform: 'uppercase',
    marginBottom: '2rem', // Add spacing between logo and buttons
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)',
        color: '#f50057',
    },
}));

// Link to homepage styles for the logo
const LogoLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none', // Remove underline
    '&:hover': {
        textDecoration: 'none', // Ensure no underline on hover
    },
}));



const Logo = () => {
    return (
        <LogoLink to="/"> {/* Link to home */}
            <LogoText variant="h1">Deadlockle</LogoText>
        </LogoLink>    );
};

export default Logo;
