import { css, keyframes } from '@emotion/react';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const slideIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-50px);
        visibility: hidden; /* Hide initially */
    }
    100% {
        opacity: 1;
        transform: translateY(0);
        visibility: visible; /* Make visible after animation */
    }
`;

export function TileComponent(props: { label: string, backgroundColor?: string, backgroundImage?: string, delay: number }) {
    return (
        <Box
            sx={{
                backgroundColor: props.backgroundImage ? 'transparent' : props.backgroundColor,
                backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: 100,
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid black',
                margin: '0 5px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                visibility: 'hidden', /* Ensure visibility is hidden initially */
                animation: css`${slideIn} 0.5s ease-out ${props.delay}s forwards`,
            }}
        >
            <Typography
                variant="body1"
                color="white"
                fontWeight="bold"
                textAlign="center"
            >
                {props.label}
            </Typography>
        </Box>
    );
};

export default function TileContainer(props: { tiles: { label: string, backgroundColor?: string, backgroundImage?: string }[] }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: 2,
            }}
        >
            {props.tiles.map((tile, index) => (
                <TileComponent
                    key={index}
                    label={tile.label}
                    backgroundColor={tile.backgroundColor}
                    backgroundImage={tile.backgroundImage}
                    delay={index * 0.2} // Apply delay based on index
                />
            ))}
        </Box>
    );
}

export function AbilityContainer(props: { image: string; name: string; guess: boolean; guessCount: number; animate: boolean }) {
    const slideIn = keyframes`
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `;
    return (
        <Box
            sx={{
                marginBottom: 2,
                position: 'relative',
                backgroundColor: props.guess ? '#e74c3c' : '#2ecc71',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column', // Stack image and text vertically
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                width: 300,
                height: 150,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                animation: props.animate ? css`${slideIn} 0.5s ease-out` : 'none', // Apply animation conditionally
            }}
        >
            <Box
                sx={{
                    width: '100px',
                    height: '100px',
                    backgroundImage: `url(${props.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '50%',
                    border: '2px solid white',
                    marginBottom: '10px', // Add some space between image and text
                }}
            />

            <Typography variant="h6" color="white" fontWeight="bold" textAlign="center">
                {props.name}
            </Typography>

            <Box
                sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '5px',
                    borderRadius: '5px',
                }}
            >
                <img
                    src="https://img.icons8.com/ios-glyphs/30/ffffff/group.png"
                    alt="guessed people"
                    style={{ width: '20px', marginRight: '5px' }}
                />
                <Typography variant="body2" color="white" fontWeight="bold">
                    {props.guessCount}
                </Typography>
            </Box>
        </Box>
    );
}
