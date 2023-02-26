export default function InitialScene({ enable, style, data, prevData, scale }) {
  return (
    <div className="relative w-full h-full z-[-1]">
      <a-scene vr-mode-ui="enabled: false">
        <a-marker preset="hiro">
          {/* two basic cubes side by side */}
          {/* {/* <a-box position="0 0 0" material="color: red;"></a-box> */}
          <a-box
            src="./vaporwave-texture.jpg"
            position="0 -0.1 0"
            height="0.0001"
            depth="6"
            width="6"
            material="color: white;"
          ></a-box>

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

const Scene = ({ style, prevData, scale }) => {
  let data =
    "0 0.5 .1 1 2 0 10 5 0 0 1.2 0 0 5.5 0 0 0 0 0 7 7 7 0 0 0 0 10 10 0 0".split(
      " "
    );

  /**
   * Reflection
   */
  if (style.style === "reflection") {
    return data ? (
      data.map((x, i) => (
        <a-box
          position={`${(
            i * style.width -
            Number(style.width) * 15
          ).toString()} 2 0`}
          width={style.width}
          depth={style.depth}
          height={Number(x) === 0 ? "0.0001" : (Number(x) / scale).toString()}
          material={
            i < 10
              ? `color: ${style.colors[0]}`
              : i < 20
              ? `color: ${style.colors[1]}`
              : `color: ${style.colors[2]}`
          }
          // animation={`property: height; from: ${(
          //   Number(x) / scale
          // ).toString()}, dur: 100; easing: easeInExpo; loop: true`}
        ></a-box>
      ))
    ) : (
      <></>
    );
  } else if (style.style === "histogram") {
    /**
     * Histogram
     */
    return data ? (
      data.map((x, i) => {
        let initialHeight = Number(data[0]) / scale;
        // console.log(
        //   (Number(x) / scale - initialHeight) / 2 + initialHeight / 2
        // );

        return (
          <a-box
            // metalness="0.5"
            src="./texture.jpg"
            repeat="100 100"
            position={`${(
              i * style.width -
              Number(style.width) * 15
            ).toString()} ${
              Number(x) === 0
                ? "0.0001"
                : (
                    (Number(x) / scale - initialHeight) / 2 +
                    initialHeight / 2
                  ).toString()
            } 0`}
            width={style.width}
            depth={style.depth}
            height={Number(x) === 0 ? "0.0001" : (Number(x) / scale).toString()}
            material={
              "" +
              (i < 10
                ? `color: ${style.colors[0]}`
                : i < 20
                ? `color: ${style.colors[1]}`
                : `color: ${style.colors[2]}`)
            }
          ></a-box>
        );
      })
    ) : (
      <></>
    );
  }
};
