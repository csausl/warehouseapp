import axios from "axios";
import {useState} from "react";

export default function AddProduct() {

    const [greeting, setGreeting] = useState<string>("");

    function handleGreet() {
        axios.get("/api/example")
            .then((response) => {
                console.log(response.data);
                setGreeting(response.data.greeting);})

    }

    return (
        <>
            <h1>Hello World!</h1>
            <button onClick={handleGreet}>click me</button>
            <h2>{greeting}</h2>
        </>
    )
}