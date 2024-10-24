import Bg from "./images/Trainbg.jpg"
import Email from "./images/Email.png"
import Elock from "./images/Elock.png"
import Eclose from "./images/Eclose.png"

function Login(){
    return(
        <div className="w-full flex items-center " >
                <div className="relative" >
                    <div className="absolute w-[35%] h-[85%] inset-5 backdrop-blur-sm bg-white/30 flex flex-col left-1/3 gap-5 p-5 rounded-lg" >
                        <p className="text-[#061FE4] text-[48px] font-semibold italic font-inter flex justify-center " >Login</p>
                        <p className=" text-[#061FE4] text-[30px] font-semibold italic font-inter flex justify-start ">Email</p>
                        <div className="flex items-center h-12 max-md:w-40 pl-1 pb-1 rounded-lg border-[#6591FB] border-2 bg-white " >
                            <img src={Email} alt="E logo" className="w-10 h-10" />
                            <input type="email"  placeholder="some.example@gmail.com" className=" pl-5 text-[#061FE4] text-[15px] font-semibold italic font-inter bg-transparent  " />
                        </div>
                        <p className=" text-[#061FE4] text-[30px] font-semibold italic font-inter flex justify-start ">Password</p>
                        <div className="flex items-center  gap-2 h-12 max-md:w-40 pl-1 pt-1 rounded-lg border-[#6591FB] border-2 bg-white " >
                            <div className="pl-2" ><img src={Elock} alt="E logo" className="w-6 h-7  "  /></div>
                            <input type="password"  placeholder="********" className=" pl-5  text-[#061FE4] text-[15px] font-semibold italic font-inter bg-transparent" />
                            <div className="flex justify-end pl-44" ><img src={Eclose} alt="E logo" className="w-10 h-7"/></div>
                        </div>
                        <div className="flex justify-center pt-14 " ><button className="flex justify-center items-center bg-[#4E61F6] text-white text-[30px] w-44 h-14 rounded-2xl hover:bg-[#061FE4] "  >Log In</button></div>
                        <p className="text-[#061FE4] text-[20px] font-semibold italic font-inter " >Don't have an account? </p>
                        {/* <Link to="/SigntoText" className="pr-4 md:pl-40 font-roboto font-medium md:text-xl text-blue-600">Log In</Link> */}
                    </div>
                    <img src={Bg} className="w-screen h-screen" />
                </div>
            </div>
    );
}

export default Login