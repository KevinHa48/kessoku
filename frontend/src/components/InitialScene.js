export default function InitialScene() {
  return (
    <div className="w-full h-full">
      <a-scene vr-mode-ui="enabled: false">
        <a-marker preset="hiro">
          {/* two basic cubes side by side */}
          <a-box position="0 0 0" material="color: red;"></a-box>
          <a-box position="1 0 0" material="color: green;"></a-box>

          {/* reflection style */}
          {/* <a-box position="0 0 0" width="0.2" depth="0.2" height="1" material="color: red;"></a-box>
          <a-box position="0.2 0 0" width="0.2" depth="0.2" height="2" material="color: blue;"></a-box>
          <a-box position="0.4 0 0" width="0.2" depth="0.2" height="3" material="color: green;"></a-box>
          <a-box position="0.6 0 0" width="0.2" depth="0.2" height="2" material="color: red;"></a-box>
          <a-box position="0.8 0 0" width="0.2" depth="0.2" height="3" material="color: blue;"></a-box>
          <a-box position="1 0 0" width="0.2" depth="0.2" height="1" material="color: green;"></a-box>
          <a-box position="1.2 0 0" width="0.2" depth="0.2" height="2" material="color: red;"></a-box>
          <a-box position="1.4 0 0" width="0.2" depth="0.2" height="1" material="color: blue;"></a-box>
          <a-box position="1.6 0 0" width="0.2" depth="0.2" height="3" material="color: green;"></a-box>
          <a-box position="1.8 0 0" width="0.2" depth="0.2" height="2" material="color: red;"></a-box>
          <a-box position="2 0 0" width="0.2" depth="0.2" height="1" material="color: blue;"></a-box> */}
                
          {/* histogram style: position x = width w, position y=(height_curr-height_first)/2 */}
          {/* <a-box position="0 0 0" width="0.2" depth="0.2" height="1" material="color: red;"></a-box>
          <a-box position="0.2 0.5 0" width="0.2" depth="0.2" height="2" material="color: blue;"></a-box>
          <a-box position="0.4 1 0" width="0.2" depth="0.2" height="3" material="color: green;"></a-box>
          <a-box position="0.6 0.5 0" width="0.2" depth="0.2" height="2" material="color: red;"></a-box>
          <a-box position="0.8 1 0" width="0.2" depth="0.2" height="3" material="color: blue;"></a-box>
          <a-box position="1 0 0" width="0.2" depth="0.2" height="1" material="color: green;"></a-box>
          <a-box position="1.2 0.5 0" width="0.2" depth="0.2" height="2" material="color: red;"></a-box>
          <a-box position="1.4 0 0" width="0.2" depth="0.2" height="1" material="color: blue;"></a-box>
          <a-box position="1.6 1 0" width="0.2" depth="0.2" height="3" material="color: green;"></a-box>
          <a-box position="1.8 0.5 0" width="0.2" depth="0.2" height="2" material="color: red;"></a-box>
          <a-box position="2 0 0" width="0.2" depth="0.2" height="1" material="color: blue;"></a-box> */}

          {/* double animation */}
          {/* <a-entity rotation="0 0 0" position="0 0 0" height="1"
              // animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
              // animation="property: height; to: 2, dur: 2000; easing: linear; loop: true"
              animation="property: position; to: 2 0 0; dur: 2000; easing: linear; loop: true">
              <a-box position="0 0 0" height="1" color="pink" animation="property: height; to: 3, dur: 2000; easing: linear; loop: true"></a-box>
          </a-entity> */}

        </a-marker>
        <a-entity camera="userHeight: 0;"></a-entity>
      </a-scene>
    </div>
  );
}
