import { Guess, GuessResponse, Hero, HeroDetail } from "../types/Types";
import React from "react";
import SelectHero from "../components/SelectHero";
import Box from "@mui/material/Box";
import TileContainer from "../components/Tile";

const LOCAL_STORAGE_KEY_HEROES = 'heroes';
const LOCAL_STORAGE_KEY_DATE = 'date';

function checkAndClearLocalStorage() {
    const savedDate = localStorage.getItem(LOCAL_STORAGE_KEY_DATE);
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    if (savedDate !== currentDate) {
        // Clear local storage if the saved date is different from the current date
        localStorage.removeItem(LOCAL_STORAGE_KEY_HEROES);
        localStorage.setItem(LOCAL_STORAGE_KEY_DATE, currentDate); // Update the saved date to the current date
    }
}

export default function Classic() {
    const [heroes, setHeroes] = React.useState<Hero[]>([]);
    const [selectedHero, setSelectedHero] = React.useState<Hero | null>(null);
    const [guessedHeros, setGuessedHeros] = React.useState<Guess[]>([]);
    const [resetKey, setResetKey] = React.useState<string>('initial');  // Key to reset Autocomplete

    React.useEffect(() => {
        const fetchAndSetHeroes = async () => {

            checkAndClearLocalStorage();
            // Fetch heroes from the API
            const heroes = await fetchHeroes();
            setHeroes(heroes);

            // Get saved heroes from local storage
            const savedHeroes = localStorage.getItem(LOCAL_STORAGE_KEY_HEROES);
            if (savedHeroes) {
                const savedGuessedHeros = JSON.parse(savedHeroes);
                setGuessedHeros(savedGuessedHeros);

                // Filter out heroes that are already guessed
                const updatedHeroes = heroes.filter(hero =>
                    !savedGuessedHeros.some((guess: Guess) => guess.hero_id === hero.id)
                );
                setHeroes(updatedHeroes);
            }
        };

        fetchAndSetHeroes();
    }, []);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedHero) {
            const [guess, hero] = await Promise.all([
                submitGuess(selectedHero),
                fetchHero(selectedHero.id)
            ]);

            if (guess && hero) {
                console.log("Guess Response:", guess);
                console.log("Hero Data:", hero);

                setGuessedHeros(prevGuessedHeros => {
                    const updatedGuessedHeros = [
                        {
                            hero_id: hero.id,
                            name: hero.name,
                            name_guess: guess.name,
                            image: hero.image,
                            gender: hero.gender,
                            gender_guess: guess.gender,
                            type: hero.type,
                            type_guess: guess.type,
                            release_year: hero.release_year,
                            release_year_guess: guess.release_year,
                            total_right_guesses: guess.total_right_guesses,
                        },
                        ...prevGuessedHeros // Add new guess to the front
                    ];

                    // Save the updated guessed heroes to local storage
                    localStorage.setItem(LOCAL_STORAGE_KEY_HEROES, JSON.stringify(updatedGuessedHeros));

                    return updatedGuessedHeros;
                });

                const deleteIndex = heroes.findIndex((hero) => hero.id === selectedHero.id);
                if (deleteIndex > -1) {
                    const newHeroes = [...heroes];
                    newHeroes.splice(deleteIndex, 1);
                    setHeroes(newHeroes);
                }

                setResetKey(Date.now().toString());  // Change the key to trigger re-render
                setSelectedHero(null);
            }
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            textAlign="center"
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="30vh" // Sets height to 30% of viewport height
                textAlign="center"
            >
                <h1>Classic</h1>
                <SelectHero heroes={heroes} handleSubmit={handleSubmit} setSelectedHero={setSelectedHero} resetKey={resetKey} />
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start" // Aligns items to the top
                alignItems="center" // Centers items horizontally
                flexGrow={1} // This will take up the remaining 70%
                textAlign="center"
            >
                {guessedHeros.map((guess, index) => (
                    <TileContainer
                        key={guess.hero_id} // Use hero_id or another unique identifier as the key
                        tiles={[
                            { label: "", backgroundImage: guess.image },
                            { label: guess.name, backgroundColor: guess.name_guess ? "green" : "red" },
                            { label: guess.gender, backgroundColor: guess.gender_guess ? "green" : "red" },
                            { label: guess.type, backgroundColor: guess.type_guess ? "green" : "red" },
                            { label: guess.release_year.toString(), backgroundColor: guess.release_year_guess ? "green" : "red" },
                        ]}
                    />
                ))}
            </Box>
        </Box>

    );
}

async function submitGuess(hero: Hero): Promise<GuessResponse | null> {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/guess/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hero_id: hero.id }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error submitting guess:', error);
        return null;
    }
}

async function fetchHero(id: number): Promise<HeroDetail | null> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/heroes/${id}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json() as HeroDetail;
    } catch (error) {
        console.error('Error fetching heroes:', error);
        return null;
    }
}

async function fetchHeroes(): Promise<Hero[]> {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/heroes/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json() as Hero[];
    } catch (error) {
        console.error('Error fetching heroes:', error);
        return [];
    }
}
