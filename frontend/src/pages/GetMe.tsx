import axios from "axios";
import {useState} from "react";

export default function GetMe() {
    const [username, setUsername] = useState("");
    function getMe(){
        axios.get('/api/auth/me').then((response) => {
                //console.log(response.data);
                setUsername(response.data);
            }
        )
    }

    return (
        <>
            <button onClick={getMe}>GetMe</button>
            <h1>Username: {username}</h1>
        </>

    )
}