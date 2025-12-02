

import './App.css'
import AddProduct from "./pages/AddProduct.tsx";
import axios from "axios";
import {useState} from "react";

function App() {

    const [username, setUsername] = useState("");

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        window.open(host + '/oauth2/authorization/github', '_self')
    }

    function getMe(){
        axios.get('/api/auth/me').then((response) => {
                //console.log(response.data);
                setUsername(response.data);
            }
        )
    }

    return (
    <>
        <AddProduct/>
        <button onClick={login}>login</button>
        <button onClick={getMe}>GetMe</button>
        <h1>Username: {username}</h1>
      <h1>hallo</h1>

    </>
  )
}

export default App
