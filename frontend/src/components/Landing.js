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
