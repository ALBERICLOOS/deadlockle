import React from "react";
import {Box, Button, Typography} from '@mui/material';
import {StyledLink} from "../pages/Home";

export default function SuccessScreen(props: { found: boolean, scrollRef: React.RefObject<HTMLDivElement>, amount_of_tries: number, amount_of_people: number }) {
    return (
        <>
    <Box
        ref={props.scrollRef}
        sx={{
            border: '2px solid #4CAF50',   // Green border
            color: '#333',                 // Text color
            padding: '20px',               // Padding inside the box
            borderRadius: '10px',          // Rounded corners
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
            marginBottom: '20px',             // Adds some margin at the top
            textAlign: 'center',           // Center the text
        }}
    >
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
            <Typography color={"#FFFFFF"}>
                Number of tries: {props.amount_of_tries}
            </Typography>
            <Typography color={"#FFFFFF"} sx={{
                mb: "5px"
            }}>
                You are the {props.amount_of_people}th person to find the hero
            </Typography>

            <Box
                sx={{
                    width: "50%",
                    borderTop: "2px solid white",
                    pt: 2,
                    margin: "0 auto",
                }}
            >
                <Typography color={"#FFFFFF"} variant="h5">
                    Play other gamemodes:
                </Typography>

                <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"  // Stacks the items vertically
                    alignItems="center"     // Centers the items horizontally
                >
                    <StyledLink to="/classic">Classic</StyledLink>
                    <StyledLink to="/ability">Ability</StyledLink>
                </Box>

            </Box>

        </Box>
    </Box>
            <Box
                ref={props.scrollRef}
                sx={{
                    border: '2px solid #0096FF',   // Green border
                    color: '#333',                 // Text color
                    padding: '20px',               // Padding inside the box
                    borderRadius: '10px',          // Rounded corners
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
                    marginBottom: '200px',         // Adds some margin at the top
                    textAlign: 'center',           // Center the text
                }}
            >
                <Typography color={"#FFFFFF"} variant="h6">
                    I found the Deadlockle in {props.amount_of_tries} tries!
                </Typography>
                <Typography color={"#FFFFFF"} variant="h6">
                    <a
                        href="https://www.deadlockle.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#FFFFFF', textDecoration: 'none' }}
                    >
                        https://www.deadlockle.com
                    </a>
                </Typography>


                <Button
                    variant="contained"
                    sx={{ mt: 2 }}  // Margin-top for spacing above the button
                    onClick={() => {
                        navigator.clipboard.writeText(
                            `I found the Deadlockle in ${props.amount_of_tries} tries! https://www.deadlockle.com`
                        );
                    }}
                >
                    Copy
                </Button>
            </Box>
        </>
    );
}
