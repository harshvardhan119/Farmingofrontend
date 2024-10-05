import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Frame1 from "../assets/Carousel_img_1.png";
import Frame2 from "../assets/Carousel_img_2.png";
import Frame3 from "../assets/Carousel_img_3.png";
import Frame4 from "../assets/Carousel_img_4.png";
import Frame5 from "../assets/Carousel_img_5.png";

export function FeatureCarousel() {
  return (
    <div className=" absolute right-[4vw] translate-y-[20vh] w-[40vw]  ">
    <div className="rounded-tl-[100px] rounded-br-[100px] drop-shadow-[0_15px_15px_rgba(17,47,81,1)] bg-sky-800 h-[80vh] w-[60vw] absolute -translate-x-36 -translate-y-12"></div>
      <Carousel  opts={{
    align: "start",
    loop: true,
  }}>
    <CarouselContent>
    <CarouselItem>
        <img src={Frame1} className="rounded-[50px]" />
        <h2 className="text-white text-xl -translate-y-20 font-sans  z-80">Historical Yield Timeline</h2>
        <h2 className="text-white text-l -translate-y-20 font-sans  z-80">Historical Yield and Future Crop Suggestions</h2>
    </CarouselItem>
    <CarouselItem>
    <img src={Frame2} className="rounded-[50px]" />
    <h2 className="text-white text-xl -translate-y-20 font-sans  z-80">Water Capacity Monitoring</h2>
        <h2 className="text-white text-l -translate-y-20 font-sans  z-80">Monitoring water capacity and irrigation management</h2>
   
    </CarouselItem>
    <CarouselItem>
    <img src={Frame3} className="rounded-[50px]" />
    <h2 className="text-white text-xl -translate-y-20 font-sans  z-80">Flood and Drought Alerts</h2>
        <h2 className="text-white text-l -translate-y-20 font-sans  z-80">Issues alert for such extreme conditions beforehand</h2>
   
    </CarouselItem>
    <CarouselItem>
    <img src={Frame4} className="rounded-[50px]" />
    <h2 className="text-white text-xl -translate-y-20 font-sans  z-80">Farmer related Govt. Schemes</h2>
        <h2 className="text-white text-l -translate-y-20 font-sans  z-80">All Govt. schemes for farmers worldwide <br/> will be shown in one place</h2>
   
    </CarouselItem>
    <CarouselItem>
    <img src={Frame5} className="rounded-[50px]" />
    <h2 className="text-white text-xl -translate-y-20 font-sans  z-80">ML Model and AI samadhan</h2>
        <h2 className="text-white text-l -translate-y-20 font-sans  z-80">AI samadhan analyses your problems and gives a suitable solution</h2>
   
    </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
</Carousel>

    </div>
    
  );
}
export default FeatureCarousel;