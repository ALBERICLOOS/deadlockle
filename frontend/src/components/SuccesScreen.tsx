import React from "react";

export default function SuccesScreen(props: {found: boolean}){
    return (
        <>
            <h1 className={`found-hero-heading ${props.found ? 'found' : ''} mobile`}>
                🎉 CORRECT HERO! 🎉
            </h1>
            <h1 className={`found-hero-heading ${props.found ? 'found' : ''} desktop`}>
                🎉 YOU HAVE FOUND THE CORRECT HERO! <span className="flip-emoji">🎉</span>
            </h1>
        </>
    )
}