import { css, keyframes } from '@emotion/react';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const slideIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-50px);
        visibility: hidden;
    }
    1% {
        visibility: visible;
    }
    100% {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
    }
`;

function TileComponent(props: { label: string, backgroundColor?: string, backgroundImage?: string, delay: number }) {
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
                visibility: 'hidden',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                animation: css`${slideIn} 0.5s ease-out ${props.delay}s forwards`,
                animationFillMode: 'forwards',
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
    // Reverse tiles to maintain correct order for animation

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
                    delay={index * 0.2} // Apply delay based on index in reversed array
                />
            ))}
        </Box>
    );
}
