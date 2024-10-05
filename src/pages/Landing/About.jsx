import React from "react";
import Farmer2 from "../../assets/img2_farmer.jpg";
function About(){
    return <div className="relative text-center top-[60vh]">
<h1 id="About" className="text-6xl font-serif text-sky-800">About Us</h1>
<h2 className="float-left left-10 font-mono text-2xl w-[50vw] relative top-10 text-left text-wrap text-sky-800">We aim to Provide farmers with insights on important factors that
affect agriculture such as, water availability, crop health, weather patterns and Soil moisture to ensure that farmers get maximum yield from
their land. </h2>
<br/>
<div className="inline rounded-tl-[60px] rounded-br-[60px] right-16 top-32 absolute bg-sky-900 h-[75vh] w-[30vw]">
</div>
<img src={Farmer2} className="absolute h-[60vh] top-44 right-36"/>
<br/>
<h2 className="float-left left-10 font-mono text-3xl w-[50vw] relative top-20 text-left text-wrap text-stone-800">How does <strong>FARMINGO</strong> do it? </h2>
<h2 className="float-left left-10 font-mono text-2xl w-[50vw] relative top-28 text-left text-wrap text-sky-800">➢ Tells farmers about current and future water storage capabilities and helps them plan their crops and harvest accordingly.</h2>
<br/>
<h2 className="float-left left-10 font-mono text-2xl w-[50vw] relative top-36 text-left text-wrap text-sky-800">➢ Provides Crop recommendations through <strong>Advanced Data Analysis</strong> to maximise farmers' yield</h2><br/>
<h2 className="float-left left-10 font-mono text-2xl w-[50vw] relative top-44 text-left text-wrap text-sky-800">➢ Takes emergencies like, flood, drought etc. into account and warns farmers about it on time. </h2>
  
    </div>
}

export default About;