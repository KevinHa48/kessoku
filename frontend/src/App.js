import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Landing from "./components/Landing";
import InitialScene from "./components/InitialScene";
import Carousel, { CarouselItem } from "./components/Carousel";

let wsURL = "ws://172.20.10.4:18080/audio";
let ws = new WebSocket(wsURL);

ws.onopen = () => {
  console.log("WebSocket connection established.");
};

function App() {
  const [WSData, setWSData] = useState("");
  const [prevWSData, setPrevWSData] = useState("");
  const [style, setStyle] = useState("reflection");
  const [play, setPlay] = useState(false);

  function handlePlay() {
    play ? setPlay(false) : setPlay(true);
  }

  ws.onmessage = (e) => {
    let res = e.data;
    setPrevWSData(WSData);
    setWSData(res);
  };

  return (
    <>
      <ArrowBackIcon
        // onClick="{handleBack}"
        className={`fixed !text-[3vw] z-0 top-0 right-50 m-8 cursor-pointer text-white ${
          play ? "backdrop-blur-md bg-black bg-opacity-50" : ""
        } hover:text-[#F6BECA]`}
      />
      <MoreHorizIcon
        className={`fixed !text-[3vw] z-10 top-0 right-0 m-8 cursor-pointer text-white ${
          play ? "backdrop-blur-md bg-black bg-opacity-50" : ""
        } hover:text-[#F6BECA]`}
      />
      
      {!play ? <Landing handlePlay={handlePlay} /> : <></>}
      <InitialScene
        enable={play}
        style={style}
        data={WSData.split(" ")}
        prevData={prevWSData.split(" ")}
        scale={20}
      />

       {/* <Carousel>
        <CarouselItem background-image="./images/ryo_square.jpg"><img src="./images/ryo_square.jpg"></img></CarouselItem>
        <CarouselItem background-image="./images/ryo_square.jpg"><img src="./images/nijika_square.jpg"></img></CarouselItem>
        <CarouselItem background-image="./images/ryo_square.jpg"><img src="./images/ikuyo_square.png"></img></CarouselItem>
      </Carousel> */}

    </>
  );
}

export default App;
