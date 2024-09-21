import {DailyAbility, AbilityGuess, Hero} from "../types/Types";
import React from "react";
import Box from "@mui/material/Box";
import SelectHero from "../components/SelectHero";
import {AbilityContainer} from "../components/Tile";
import {checkAndClearLocalStorage} from "./Classic";
import {fetchDailAbility, fetchHeroes, submitAbilityGuess} from "../api/Api";
import {LOCAL_STORAGE_ABILITY_SUCCESS, LOCAL_STORAGE_KEY_ABILITIES} from "../constants";
import SuccesScreen from "../components/SuccesScreen";
/*
LOCAL STORAGE:
LOCAL_STORAGE_KEY_ABILITIES: holds a list of the guessed heroes
LOCAL_STORAGE_KEY_DATE: holds the date of the last saved guess
LOCAL_STORAGE_ABILITY_SUCCESS: holds if the guess was correct
*/


export default function Ability() {
    const [dailyAbility, setDailyAbility] = React.useState<DailyAbility | null>(null);
    const [heroes, setHeroes] = React.useState<Hero[]>([]);
    const [selectedHero, setSelectedHero] = React.useState<Hero | null>(null);
    const [guessedHeros, setGuessedHeros] = React.useState<AbilityGuess[]>([]);
    const [resetKey, setResetKey] = React.useState<string>('initial');
    const [found, setFound] = React.useState<boolean>(false);

    React.useEffect(() => {
        const fetchAndSetDailyAbility = async () => {

            const heroes = await fetchHeroes();
            setHeroes(heroes);

            checkAndClearLocalStorage(LOCAL_STORAGE_KEY_ABILITIES);
            const savedAbilities = localStorage.getItem(LOCAL_STORAGE_KEY_ABILITIES);
            if (savedAbilities) {
                const savedGuessedHeros = JSON.parse(savedAbilities);
                setGuessedHeros(savedGuessedHeros);

                // Filter out heroes that are already guessed
                const updatedHeroes = heroes.filter(hero =>
                    !savedGuessedHeros.some((guess: AbilityGuess) => guess.hero_id === hero.id)
                );
                setHeroes(updatedHeroes);
            }

            const dailyAbility = await fetchDailAbility();
            if (dailyAbility) {
                setDailyAbility(dailyAbility);
            }

            const success = localStorage.getItem(LOCAL_STORAGE_ABILITY_SUCCESS);
            if (success){
                setFound(true);
            }

        };
        fetchAndSetDailyAbility();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedHero){
            const [guess] = await Promise.all([
                submitAbilityGuess(selectedHero),
            ]);
            if (guess !== null){
                setGuessedHeros(prevGuessedHeros => {
                    const updatedGuessedHeros = [{
                        ability: guess.guess,
                        hero_id: selectedHero.id,
                        hero_name: selectedHero.name,
                        image: selectedHero.image,
                        total_guesses: guess.total_guesses,
                    }, ...prevGuessedHeros];
                    localStorage.setItem(LOCAL_STORAGE_KEY_ABILITIES, JSON.stringify(updatedGuessedHeros));
                    return updatedGuessedHeros;
                });

                if (guess.guess){ // the guess is correct
                    setFound(true);
                    localStorage.setItem(LOCAL_STORAGE_ABILITY_SUCCESS, "true");
                }

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

    };
    return(
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
                height="50vh" // Sets height to 30% of viewport height
                textAlign="center"
            >
                <h1>Ability</h1>
                <img
                    src={"data:image/jpeg;base64," + dailyAbility?.image_base64}
                    className="image-style"
                />
                {!found ? (
                    <SelectHero
                        heroes={heroes}
                        handleSubmit={handleSubmit}
                        setSelectedHero={setSelectedHero}
                        resetKey={resetKey}
                    />
                ) : (
                    <SuccesScreen found={found} />
                )}
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
                    <AbilityContainer key={guess.hero_id} image={guess.image} guess={guess.ability} name={guess.hero_name} guessCount={guess.total_guesses} animate={index === 0} />
                ))}
            </Box>
        </Box>

)
}




