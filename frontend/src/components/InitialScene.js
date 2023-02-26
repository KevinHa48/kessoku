export default function InitialScene() {
  return (
    <div className="w-full h-full">
      <a-scene vr-mode-ui="enabled: false">
        <a-marker preset="hiro">
          <a-box position="0 1 0" material="color: red;"></a-box>
          <a-box position="0 0 0" material="color: green;"></a-box>
        </a-marker>
        <a-entity camera="userHeight: 0;"></a-entity>
      </a-scene>
    </div>
  );
}
