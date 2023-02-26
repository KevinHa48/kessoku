import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Landing from "./components/Landing";
import InitialScene from "./components/InitialScene";
import Customize from "./components/Customize";

let wsURL = "ws://172.20.10.4:18080/audio";
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
    colors: ["#6B8CC0", "#F6BECA", "#E26A58"],
  });
  const [play, setPlay] = useState(false);
  const [toggleCustomize, setToggleCustomize] = useState(false);

  function handlePlay() {
    play ? setPlay(false) : setPlay(true);
  }

  function handleStyle(obj) {
    console.log(obj);
    setStyle(obj);
    setToggleCustomize(false);
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
          play ? "bg-black" : ""
        } hover:text-[#F6BECA]`}
        onClick={() => setToggleCustomize(true)}
      />

      {play ? <></> : <Landing handlePlay={handlePlay} />}
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
