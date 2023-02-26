export default function InitialScene({ enable, style, data, prevData, scale }) {
  return (
    <div className="relative w-full h-full z-[-1]">
      <a-scene vr-mode-ui="enabled: false">
          <a-marker preset="custom" type="pattern" url="./markers/HRU_2.patt">
          {/* two basic cubes side by side */}
          {/* <a-box position="0 0 0" material="color: red;"></a-box>
          <a-box position="1 0 0" material="color: green;"></a-box> */}

          {enable ? (
            <Scene
              style={style}
              data={data}
              prevData={prevData}
              scale={scale}
            />
          ) : (
            <></>
          )}

          {/* double animation */}
          {/* <a-entity
            rotation="0 0 0"
            position="0 0 0"
            height="1"
            // animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
            // animation="property: height; to: 2, dur: 2000; easing: linear; loop: true"
            animation="property: position; to: 0 1.5 0; dur: 2000; easing: linear; loop: true"
          > */}
          {/* <a-box
            position="0 0 0"
            width="1"
            height="1"
            depth="1"
            color="pink"
            animation="property: height; to: 3, dur: 2000; easing: linear; loop: true"
          ></a-box> */}
          {/* </a-entity> */}
        </a-marker>
        <a-entity camera="userHeight: 0;"></a-entity>
      </a-scene>
    </div>
  );
}

const Scene = ({ style, data, prevData, scale }) => {
  /**
   * Reflection
   */
  if (style === "reflection") {
    return data ? (
      data.map((x, i) => (
        <a-box
          position={`${(i * 0.2 - 3).toString()} 0 0`}
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
          // animation={`property: height; from: ${(
          //   Number(x) / scale
          // ).toString()}, dur: 100; easing: easeInExpo; loop: true`}
        ></a-box>
      ))
    ) : (
      <></>
    );
  } else if (style === "histogram") {
    /**
     * Histogram
     */
    return data ? (
      data.map((x, i) => {
        let initialHeight = Number(data[0]) / scale;

        return (
          <a-box
            position={`${(i * 0.2 - 3).toString()} ${
              (Number(x) / scale - initialHeight) / 2 + initialHeight / 2 - 1
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
    );
  }
};
