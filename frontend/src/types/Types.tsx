export type HeroDetail = {
    id: number;
    name: string;
    gender: "M" | "F" | "X";
    type: "Tank" | "DPS" | "Support";
    release_year: number;
    image: string;
}

export type Hero = {
    id: number;
    name: string;
    image: string;
}

export type HeroGuessResponse = {
    name: boolean,
    guess: boolean,
    gender: boolean,
    type: boolean,
    release_year: boolean,
    total_guesses: number,
}

export type AbilityGuessResponse = {
    guess: boolean,
    total_guesses: number,
}

export type AbilityGuess = {
    ability: boolean,
    hero_id: number;
    hero_name: string;
    image: string;
    total_guesses: number;
}

export type HeroGuess = {
    hero_id: number;
    image: string;
    name: string;
    name_guess: boolean;
    gender: "M" | "F" | "X";
    gender_guess: boolean;
    type: "Tank" | "DPS" | "Support";
    type_guess: boolean;
    release_year: number;
    release_year_guess: boolean;
    total_guesses: number;
}


export type DailyAbility = {
    id: number;
    image_base64: string;
}
