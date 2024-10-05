import React from "react";
import { Button } from "@/components/ui/button";
function Navbar(){
    function goHome(){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
    }
    function goAbout(){
        document.getElementById("About").scrollIntoView({behavior: 'smooth' });
    }
    function goFeatures(){
        document.getElementById("Features").scrollIntoView({behavior: 'smooth' });
    }
    function goContact(){
        document.getElementById("Contact").scrollIntoView({behavior: 'smooth' });
    }
    
    return <div className="inline mx-auto my-auton hover:opacity-100">
        <Button size="lg" onClick={goHome} className="text-base bg-transparent rounded-full mr-5 text-[1f2f41] font-bold hover:text-white">Home</Button>
        <Button size="lg" onClick={goAbout} className="text-base bg-transparent rounded-full mr-5 text-[1f2f41] font-bold hover:text-white">About</Button>
        <Button size="lg" onClick={goFeatures} className="text-base bg-transparent rounded-full mr-5 text-[1f2f41] font-bold hover:text-white">Features</Button>
        <Button size="lg" onClick={goContact} className="text-base bg-transparent rounded-full mr-5 text-[1f2f41] font-bold hover:text-white">Contact</Button>
    </div>
}

export default Navbar;