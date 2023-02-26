import { useState } from "react";

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

  ws.onmessage = (e) => {
    let res = e.data;
    setPrevWSData(WSData);
    setWSData(res);
  };

  return (
    <>
      <Landing />
      <InitialScene
        style={style}
        data={WSData.split(" ")}
        prevData={prevWSData.split(" ")}
        scale={20}
      />
    </>
  );
}

export default App;
