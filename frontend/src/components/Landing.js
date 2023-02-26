import { useState } from "react";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

export default function Landing({ handlePlay }) {
  const [vinyl, setVinyl] = useState("0px");

  return (
    <div className="fixed w-screen h-screen backdrop-blur-md bg-black bg-opacity-80 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <span className="flex items-center justify-center">
          <img
            className="w-full cursor-pointer"
            src={require("../images/bocchi_square.jpg")}
          ></img>
          <img
            className={`z-[-1] !ml-[${vinyl}] absolute  transition-all `}
            style={{ marginLeft: vinyl }}
            src="./images/vinyl.png"
            alt=""
          />
        </span>

        <h1 className="text-white text-3xl">Kessoku</h1>

        <span className="space-x-8">
          <SkipPreviousIcon
            className="!text-[2vw]"
            style={{ color: "lightgray" }}
          />
          <PlayCircleOutlineIcon
            onMouseEnter={() => setVinyl("20%")}
            onMouseLeave={() => setVinyl("0px")}
            onClick={handlePlay}
            className="!text-[3.5vw] cursor-pointer text-white hover:text-[#F6BECA]"
          />
          <SkipNextIcon
            className="!text-[2vw]"
            style={{ color: "lightgray" }}
          />
        </span>
      </div>
    </div>
  );
}
