// import Home from "./Home.jsx"
// import About from "./About.jsx"

function Navbar(){
    return(
        <div className="flex justify-center items-center pt-2" >
            <button className="font-semibold font-sans text-xl  hover:text-white hover:backdrop-blur-sm hover:bg-emerald-100/30 h-12 w-20 rounded-sm flex justify-center items-center " >Home</button>
            <button className="font-semibold font-sans text-xl  hover:text-white hover:backdrop-blur-sm hover:bg-emerald-100/30 h-12 w-52 rounded-md flex justify-center items-center " >About the Project</button>
            <button className="font-semibold font-sans text-xl  hover:text-white hover:backdrop-blur-sm hover:bg-emerald-100/30 h-12 w-52 rounded-md flex justify-center items-center " >About the Team</button>
        </div>
    );
}

export default Navbar