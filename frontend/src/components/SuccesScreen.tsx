import React from "react";
import { Box, Typography } from '@mui/material';

export default function SuccessScreen(props: { found: boolean }) {
    return (
        <Box textAlign="center">
            <Typography
                variant="h1"
                color="#4CAF50"
                margin="10px"
                className={`found-hero-heading ${props.found ? 'found' : ''}`}
                fontSize={
                    {
                        xs: '1.5rem',
                        sm: '2rem',
                }}
                sx={{ display: { xs: 'block', md: 'none' } }} // Only show on xs to sm
            >
                🎉 CORRECT HERO! <span className="flip-emoji">🎉</span>
            </Typography>
            <Typography
                variant="h1"
                color="#4CAF50"
                margin="10px"
                className={`found-hero-heading ${props.found ? 'found' : ''}`}
                sx={{ display: { xs: 'none', md: 'block' } }}
                fontSize={{
                    md: '2.5rem',
                    lg: '3rem',
                }}
            >
                🎉 YOU HAVE FOUND THE CORRECT HERO! <span className="flip-emoji">🎉</span>
            </Typography>
        </Box>
    );
}
