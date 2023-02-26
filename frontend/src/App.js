import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <>
      <a-scene>
        <a-marker preset="hiro">
          <a-box position="0 0 0" material="color: red;"></a-box>
        </a-marker>
        <a-entity camera="userHeight: 0;"></a-entity>
      </a-scene>
    </>
  );
}

export default App;
