import Logo from "./Logo";
import Title from "./Title";
import SelectHero from "./SelectHero";
import SuccesScreen from "./SuccesScreen";
import Box from "@mui/material/Box";
import React, {Dispatch} from "react";
import {Hero} from "../types/Types";

export default function PageHeader(props: {title: string, found: boolean, heroes: Hero[], handleSubmit: React.FormEventHandler<HTMLFormElement>, setSelectedHero: Dispatch<React.SetStateAction<Hero | null>>, resetKey: string, image?: string}) {
    return(
        <Box
            marginTop={7}
            marginBottom={5}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <Logo/>
            <Title variant="h1">{props.title}</Title>
            {props.image && <img
                src={"data:image/jpeg;base64," + props.image}
                className="image-style"
            />}
            {!props.found &&
                <SelectHero heroes={props.heroes} handleSubmit={props.handleSubmit}
                            setSelectedHero={props.setSelectedHero} resetKey={props.resetKey} />
            }
        </Box>
    )
}