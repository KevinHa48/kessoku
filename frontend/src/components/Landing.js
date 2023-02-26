import IconButton from '@mui/material/IconButton';
import { Button, Box } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Landing() {
  return (
    <div className="fixed w-screen h-screen backdrop-blur-md bg-black bg-opacity-50 grid place-items-center">
       <MoreHorizIcon fontSize="large" style={{color: 'white', top: 2, right: 3}} />
        
        <img src={require("../images/bocchi_square.jpg")}></img>
        <div>
          <SkipPreviousIcon fontSize="large" style={{color: 'white'}} />
          <PlayCircleOutlineIcon fontSize="large" style={{color: 'white'}} />
          <SkipNextIcon fontSize="large" style={{color: 'white'}} />  
        </div>
        <FileUploadIcon  fontSize="large" style={{color: 'white'}} />
      {/* <Overlay color="#000000" opacity="50" /> */}
    </div>
  );
}
