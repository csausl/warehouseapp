import {Link} from "react-router-dom";


export default function Navbar() {
    return (
        <>
            <Link to={"/"}><button>Home</button></Link>
            <Link to={"/hello"}><button>Hello </button></Link>
            <Link to={"/addproduct"}><button> addProd</button></Link>

        </>
    )
}