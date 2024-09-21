import {Link} from "react-router-dom";
import "../App.css";

export default function Home(){
    return(
        <div className={"App"}>
            <h1>Home</h1>
            <Link to={"/classic"} className="button-74">Classic</Link>
            <Link to={"/ability"} className="button-74">Ability</Link>
        </div>
    )
}