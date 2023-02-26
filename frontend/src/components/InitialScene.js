export default function InitialScene({ data, scale }) {
  return (
    <div className="w-full h-full">
      <a-scene vr-mode-ui="enabled: false">
        <a-marker preset="hiro">
          {/* two basic cubes side by side */}
          {/* <a-box position="0 0 0" material="color: red;"></a-box>
          <a-box position="1 0 0" material="color: green;"></a-box> */}

          {/* reflection style */}
          {/* {data ? (
            data.map((x, i) => (
              <a-box
                position={`${(i * 0.2).toString()} 0 0`}
                width="0.2"
                depth="0.2"
                height={(Number(x) / 10).toString()}
                material={
                  i % 3 === 0
                    ? "color: red;"
                    : i % 3 === 1
                    ? "color: green;"
                    : "color: blue;"
                }
              ></a-box>
            ))
          ) : (
            <></>
          )} */}

          {/* histogram style: position x = width w, position y=(height_curr-height_first)/2 */}
          {data ? (
            data.map((x, i) => {
              let initialHeight = Number(data[0]) / scale;

              return (
                <a-box
                  position={`${(i * 0.2).toString()} ${
                    (Number(x) / scale - initialHeight) / 2 + initialHeight / 2
                  } 0`}
                  width="0.2"
                  depth="0.2"
                  height={(Number(x) / scale).toString()}
                  material={
                    i % 3 === 0
                      ? "color: red;"
                      : i % 3 === 1
                      ? "color: green;"
                      : "color: blue;"
                  }
                ></a-box>
              );
            })
          ) : (
            <></>
          )}

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
