import { css, keyframes } from '@emotion/react';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import {green, red} from "../constants";

const slideIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-50px);
        visibility: hidden;
    }
    100% {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
    }
`;

export function TileComponent(props: { label: string, backgroundColor?: string, backgroundImage?: string, delay: number, fontColor?: string}) {
    return (
        <Box
            sx={{
                backgroundColor: props.backgroundImage ? 'transparent' : props.backgroundColor,
                backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : 'none',
                backgroundSize: 'cover',
                borderRadius: '10px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: {
                    xs: '60px',   // Width for extra-small devices
                    sm: '80px',   // Width for small devices
                    md: '100px',  // Width for medium and up
                },
                height: {
                    xs: '60px',   // Height for extra-small devices
                    sm: '80px',   // Height for small devices
                    md: '100px',  // Height for medium and up
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid black',
                margin: {
                    md: '0 5px',
                    xs: '0 2px',
                },
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                visibility: 'hidden', /* Ensure visibility is hidden initially */
                animation: css`${slideIn} 0.5s ease-out ${props.delay}s forwards`,
            }}
        >
            <Typography
                variant="body1"
                color={props.fontColor ? props.fontColor : 'white'}
                fontWeight="bold"
                textAlign="center"
            >
                {props.label}
            </Typography>
        </Box>
    );
};
export default function TileContainer(props: { tiles: { label: string, backgroundColor?: string, backgroundImage?: string, fontColor?: string}[] }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Change to 'center' to center the tiles
                padding: {
                    xs: 1,
                    sm: 1,
                    md: 2,
                },
                width: "100%",
                flexWrap: 'wrap', // Allow tiles to wrap if necessary
            }}
        >
            {props.tiles.map((tile, index) => (
                <TileComponent
                    key={index}
                    label={tile.label}
                    backgroundColor={tile.backgroundColor}
                    backgroundImage={tile.backgroundImage}
                    delay={index * 0.2} // Apply delay based on index
                    fontColor={tile.fontColor}
                />
            ))}
        </Box>
    );
}
export function AbilityContainer(props: { image: string; name: string; guess: boolean; guessCount: number; animate: boolean }) {
    return (
        <Box
            sx={{
                marginBottom: 2,
                position: 'relative',
                backgroundColor: props.guess ? green : red,
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
