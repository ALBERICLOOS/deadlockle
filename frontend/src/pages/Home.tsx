import {Link} from "react-router-dom";
import "../App.css";
import Logo from "../components/Logo";
import Box from "@mui/material/Box";
import {styled} from "@mui/system";
import React from "react";

export default function Home(){
    return(
        <LogoContainer>
            <Logo/>
            <StyledLink to="/classic">Classic</StyledLink>
            <StyledLink to="/ability">Ability</StyledLink>
        </LogoContainer>
    )
}

// Logo container styles
const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', // To stack logo and buttons vertically
    height: '100vh',
    backgroundColor: '#1a1a1a',
}));

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none', // Remove underline from links
    fontFamily: '"Orbitron", sans-serif',
    color: '#fff',
    backgroundColor: '#f50057', // Button background color
    padding: '0.8rem 2rem',
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1rem',
    borderRadius: '5px',
    margin: '0.5rem 0', // Space between buttons
    width: '100px', // Set a fixed width for buttons
    display: 'flex', // Ensure the content is centered
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)', // Enlarge button on hover
        backgroundColor: '#ff4081', // Lighter shade on hover
    },
}));