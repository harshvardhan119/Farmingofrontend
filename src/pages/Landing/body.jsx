import { BookDashed } from "lucide-react";
import React from "react";
import Farmer from "../../assets/img1_farmer.jpg"
import About from "./About";
import Features from "./Features";
import Contact from "./contact";
import Footer from "./footer";
function Body(){
    return <div>
    <div className=" inline rounded-tr-[60px] rounded-bl-[60px] left-28 top-28 absolute bg-sky-900 h-4/6 w-3/12">
        <img className="h-96 p-4 mx-20 mt-10" src={Farmer} alt="not loaded"/>
    </div>
    <div className="block text-center relative top-[20vh]">
       <h1 className="inline font-serif relative left-72 top-20 text-8xl text-sky-800 ">Farmingo</h1><br/> <br/>   
       <h1 className="inline font-mono relative left-72 top-20 text-4xl text-sky-800">A feature packed Solution<br/>to solve All your Agricultural Problems</h1>
       
    </div>
    <About/>
    <Features/>
    
    <Contact/>
    <Footer/>
    </div>
}

export default Body;
