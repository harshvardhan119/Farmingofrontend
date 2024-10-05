import React from "react";

import FeatureCarousel from "@/components/Framecarousel";
// import { CCarousel,CCarouselCaption,CImage,CCarouselItem } from "@coreui/react";
function Features(){
    return <div className="relative text-center right-[25vw] top-[150vh]">
    <h1 id="Features" className="text-6xl font-serif text-sky-800">Features</h1>
    <FeatureCarousel/>
    </div>
}

export default Features