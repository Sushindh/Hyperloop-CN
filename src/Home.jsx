import Navbar from "./Navbar.jsx"

function Home(){
    return(
        <>
        <div className="flex flex-col gap-5 " >
            <div className="bg-[url('/src/images/Trainbg2.webp')] bg-cover bg-center bg-no-repeat w-screen h-screen" >
                <Navbar />
                <div className="relative w-full max-w-4xl mx-auto  pt-10">
                    <div className="absolute top-10 left-0 w-full h-36  skew-y-2"></div>
                    <div className="relative text-white p-4">
                        <h1 className="text-6xl font-bold uppercase text-gray-800 leading-none">
                            Hyperloop Trains
                        </h1>
                        <h2 className="text-4xl mt-2 font-bold text-gray-800  uppercase">
                        A Technical Vision of Indian Railways
                        </h2>
                    </div>
                </div>
            </div>
            <h className="flex justify-center text-3xl font-sans font-bold " >Hyperloop Journey Insights: Real-Time Speed and Distance Tracker from Station to Station</h>
            <div className="h-screen w-screen bg-white flex items-center justify-around ">
                <div className="w-80 h-96 bg-emerald-300 rounded-xl flex flex-col gap-5 justify-center " >
                    <p className="font-semibold font-sans text-xl pl-3" >Boarding from:</p>
                    <div className="flex justify-center" ><input type="text" placeholder="Enter your Boarding point" className="w-60 h-10 rounded-md pl-3"/></div>
                    <p className="font-semibold font-sans text-xl pl-3" >To Destination</p>
                    <div className="flex justify-center" ><input type="text" placeholder="Enter your destination" className="w-60 h-10 rounded-md pl-3 " /></div>
                    <br/>
                    <div className="flex justify-center" ><button className="w-20 h-10 bg-stone-50 rounded-md font-semibold font-sans text-xl hover:bg-stone-400 " >Start</button></div>
                </div>
                <div className="w-80 h-96 bg-emerald-300 rounded-xl" >

                </div>
            </div>
        </div>
        </>
    );

}

export default Home