import { useState } from "react";

import Landing from "./components/Landing";
import InitialScene from "./components/InitialScene";

let wsURL = "ws://172.20.10.4:18080/audio";
let ws = new WebSocket(wsURL);

ws.onopen = () => {
  console.log("WebSocket connection established.");
};

function App() {
  const [x, setX] = useState("");

  ws.onmessage = (e) => {
    let res = e.data;
    setX(res);
    console.log(x);
  };

  return (
    <>
      <Landing x={x} />
      <InitialScene data={x.split(" ")} scale={20} />
    </>
  );
}

export default App;
