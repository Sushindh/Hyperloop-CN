import Hyper from "./images/about1.jpg"
import Navbar from "./Navbar.jsx";

function About(){
    return(
        <div>
            <div className="bg-emerald-300 h-20" >< Navbar/></div>
            <img src={Hyper} className="h-60 w-60" />
        </div>
    );
}

export default About