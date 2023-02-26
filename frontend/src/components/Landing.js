import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

export default function Landing({ handlePlay }) {
  return (
    <div className="fixed w-screen h-screen backdrop-blur-md bg-black bg-opacity-70 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <img
          className="h-[50%]"
          src={require("../images/bocchi_square.jpg")}
        ></img>

        <h1 className="text-white text-3xl">Kessoku</h1>

        <span className="space-x-8">
          <SkipPreviousIcon
            className="!text-[2vw]"
            style={{ color: "lightgray" }}
          />
          <PlayCircleOutlineIcon
            onClick={handlePlay}
            className="!text-[3.5vw] cursor-pointer text-white hover:text-[#F6BECA]"
          />
          <SkipNextIcon
            className="!text-[2vw]"
            style={{ color: "lightgray" }}
          />
        </span>
      </div>
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