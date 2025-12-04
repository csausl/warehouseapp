import {useState} from "react";
import axios from "axios";

export default function AdminPage() {
    const [admin, setAdmin] = useState<string>("");

    function getAdmin(){
        axios.get('/api/auth/admin').then((response) => {
                //console.log(response.data);
                setAdmin(response.data);
                console.log(response.data);
            }
        )
    }

    return (
        <>
            <button onClick={getAdmin}>GetAdmin</button>
            <h1>text: {admin}</h1>
        </>

    )

}