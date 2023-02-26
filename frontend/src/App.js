import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Landing from "./components/Landing";
import InitialScene from "./components/InitialScene";

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
      <MoreHorizIcon
        className={`fixed !text-[3vw] z-10 top-0 right-0 m-8 cursor-pointer text-white ${
          play ? "bg-black" : ""
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
    </>
  );
}

export default App;
