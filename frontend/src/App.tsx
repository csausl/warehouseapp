
import './App.css'
import AddProduct from "./pages/AddProduct.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Navbar from "./pages/Navbar.tsx";
import Dashboard from "./pages/Dashboard.tsx";

function App() {


    const [user,setUser] = useState<string|undefined|null>(undefined);

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        window.open(host + "/oauth2/authorization/github", "_self")
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        window.open(host + "/logout", "_self")
    }

    const loadUser =()=>{
        axios.get("/api/auth")
            .then(response => setUser(response.data))
            .catch(error => {
                setUser(null);
                console.log(error);
            })
    }

    useEffect(() => {
        loadUser()
    },[])

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<h1>Hello, please Login</h1>}/>
                <Route element={<ProtectedRoute user={user}/>}>
                    <Route path={"/hello"} element={<LandingPage username={user}/>}/>
                    <Route path={"/dashboard"} element={<Dashboard/>} />
                </Route>
           </Routes>
            <button onClick={login}>login</button>
            <button onClick={logout}>logout</button>


        </>
  )
    //<Route path={"/"} element={<LandingPage/>}/>
    //<Route path={"/addProduct"} element={<AddProduct/>}/>
    //<button onClick={loadUser}>get me</button>
    //
}

export default App
