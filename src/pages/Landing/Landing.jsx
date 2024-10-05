import React from "react";
import { useNavigate } from "react-router-dom";
import Farmingo from "../../assets/farmingologo.svg";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import Body from "./body";


    function Landing(){
        const navigate = useNavigate();

        

        return <div className="h-[450vh] bg-scroll overflow-hidden bg-gradient-to-r from-blue-200 to-blue-300">
        <div className="flex backdrop-blur-[4px] z-20 items-center fixed justify-between ">
        <img src={Farmingo} alt="logo" className="w-40 mr-96 inline"/>
        <Navbar />
        <div className="float-right m-3">
        <Button className="rounded-full ml-56 my-3 bg-[#365170]" size="lg" onClick={()=>{
            navigate("/auth");
        }}>Sign In</Button>
        </div>
        </div>
        <Body/>
        
        </div>
    }

export default Landing;