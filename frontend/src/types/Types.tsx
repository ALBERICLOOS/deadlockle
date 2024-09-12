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

export type GuessResponse = {
    name: boolean,
    guess: boolean,
    gender : boolean,
    type : boolean,
    release_year : boolean,
    total_right_guesses : number,
}

export type Guess = {
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
    total_right_guesses : number,
}
