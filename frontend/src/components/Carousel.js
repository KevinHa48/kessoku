import React, { useEffect, useState } from "react";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

import "./Carousel.css";

export const CarouselItem = ({ children, width, handleCarousel }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

export default function Carousel({ children, handlePlay, handleCarousel }) {
  const [vinyl, setVinyl] = useState("0px");
  const [activeIndex, setActiveIndex] = useState(0);
  let header = "";

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  if(activeIndex == 0) {
    header = "Ryo Reflection"
  } else if (activeIndex == 1) {
    header = "Natural Nijika"
  } else if (activeIndex == 2) {
    header = "Custom Ikuyo"
  }

  return (
    <div className="carousel">
      <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {/* <span className="flex items-center justify-center"> */}
          {/* <img
            className="w-full cursor-pointer"
            src={require("../images/bocchi_square.jpg")}
          ></img>
          <img
            className={`z-[-1] !ml-[${vinyl}] absolute  transition-all `}
            style={{ marginLeft: vinyl }}
            src="./images/vinyl.png"
            alt=""
          /> */}
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, { width: "100%" });
          })}
          <img
            className={`z-[-1] !ml-[${vinyl}] absolute  transition-all flex items-center justify-center `}
            style={{ marginLeft: vinyl }}
            src="./images/vinyl.png"
            alt=""
            // className="flex items-center justify-center"
          />
        {/* </span> */}
        </div>
        

        <div className="carousel-header">
          <h1>{header}</h1>
        </div>

        <div className="indicators">
          <span className="space-x-8">
            <SkipPreviousIcon
              className="!text-[2.5vw] cursor-pointer text-white hover:text-[#F6BECA]"
              style={{ color: "lightgray" }}
              onClick={() => {
                updateIndex(activeIndex - 1);
              }}
            />
            <PlayCircleOutlineIcon
              onMouseEnter={() => setVinyl("20%")}
              onMouseLeave={() => setVinyl("0px")}
              onClick={() => handleCarousel(activeIndex === 0 ? "ryou" : (activeIndex === 1 ? "nijika" : "kita"))}
              className="!text-[3vw] cursor-pointer text-white hover:text-[#F6BECA]"
            />
            <SkipNextIcon
              className="!text-[2.5vw] cursor-pointer text-white hover:text-[#F6BECA]"
              style={{ color: "lightgray" }}
              onClick={() => {
                updateIndex(activeIndex + 1);
              }}
            />
          </span>
        </div>
    </div>
  );
}
