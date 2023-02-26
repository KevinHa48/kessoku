import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Landing from "./components/Landing";
import InitialScene from "./components/InitialScene";
import Customize from "./components/Customize";
import Carousel, { CarouselItem } from "./components/Carousel";

let wsURL = "ws://172.20.10.11:18080/audio";
let ws = new WebSocket(wsURL);

ws.onopen = () => {
  console.log("WebSocket connection established.");
};

function App() {
  const [WSData, setWSData] = useState("");
  const [prevWSData, setPrevWSData] = useState("");
  const [style, setStyle] = useState({
    style: "reflection",
    width: "0.2",
    depth: "0.2",
    gap: "0",
    colors: ["#6B8CC0", "#F6BECA", "#E26A58"],
  });
  const [play, setPlay] = useState(false);
  const [toggleCarousel, setToggleCarousel] = useState(false);
  const [toggleCustomize, setToggleCustomize] = useState(false);

  function handlePlay() {
    play ? setPlay(false) : setPlay(true);
  }

  function handleStyle(obj) {
    console.log(obj);
    setStyle(obj);
    setToggleCustomize(false);
  }

  function handleCarousel(opt) {
    setToggleCarousel(false);
    if (opt === "ryou") {
      setStyle({
        style: "reflection",
        width: "0.1",
        depth: "0.1",
        gap: "4",
        colors: ["#758EB6", "#4272BF", "#1A3561"],
      });
    } else if (opt === "nijika") {
      setStyle({
        style: "histogram",
        width: "0.2",
        depth: "0.2",
        gap: "0",
        colors: ["#1A3561", "#EDD280", "#C3A95A"],
      });
    } else if (opt === "kita") {
      setToggleCustomize(true);
    }
  }

  ws.onmessage = (e) => {
    let res = e.data;
    setPrevWSData(WSData);
    setWSData(res);
    console.log(res);
  };

  return (
    <>
      <MoreHorizIcon
        className={`fixed !text-[3vw] z-10 top-0 right-0 m-8 cursor-pointer text-white ${
          play ? "backdrop-blur-md bg-black bg-opacity-50" : ""
        } hover:text-[#F6BECA]`}
        onClick={() => setToggleCarousel(true)}
      />

      {play || toggleCarousel || toggleCustomize ? (
        <></>
      ) : (
        <Landing handlePlay={handlePlay} />
      )}
      {toggleCarousel ? (
        <div className="fixed w-screen h-screen backdrop-blur-md bg-black bg-opacity-80 ">
          <ArrowBackIcon
            onClick={() => setToggleCarousel(false)}
            className={`fixed !text-[3vw] z-0 top-0 right-50 m-8 cursor-pointer text-white ${
              play ? "backdrop-blur-md bg-black bg-opacity-50" : ""
            } hover:text-[#F6BECA]`}
          />
          <Carousel>
            <CarouselItem>
              <img
                className="cursor-pointer"
                onClick={() => handleCarousel("ryou")}
                src="./images/ryo_square.jpg"
              ></img>
            </CarouselItem>
            <CarouselItem>
              <img
                className="cursor-pointer"
                onClick={() => handleCarousel("nijika")}
                src="./images/nijika_square.jpg"
              ></img>
            </CarouselItem>
            <CarouselItem>
              <img
                className="cursor-pointer"
                onClick={() => handleCarousel("kita")}
                src="./images/ikuyo_square.png"
              ></img>
            </CarouselItem>
          </Carousel>
        </div>
      ) : (
        <></>
      )}

      {toggleCustomize ? <Customize handleStyle={handleStyle} /> : <></>}

      <InitialScene
        enable={play}
        style={style}
        data={WSData.split(" ")}
        prevData={prevWSData.split(" ")}
        scale={4}
      />
    </>
  );
}

export default App;
