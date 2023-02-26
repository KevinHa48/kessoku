import { useRef } from "react";

export default function Customize({ handleStyle }) {
  const styleRef = useRef("");
  const widthRef = useRef(0.2);
  const depthRef = useRef(0.2);
  const gapRef = useRef(0);
  const colorRef1 = useRef("");
  const colorRef2 = useRef("");
  const colorRef3 = useRef("");

  return (
    <div className="fixed flex flex-col justify-center items-center w-screen h-screen backdrop-blur-md bg-black bg-opacity-80">
      <table className="[&>tr>td]:!p-4 [&>tr>td]:!px-10 [&>tr>td>label]:text-white [&>tr>td>label]:text-3xl [&>tr>td>*]:bg-transparent [&>tr>td>*]:text-white [&>tr>td>*]:text-3xl">
        <tr>
          <td>
            <label>Style</label>
          </td>
          <td>
            <select name="style" ref={styleRef}>
              <option value="histogram">Bar</option>
              <option value="reflection">Reflection</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label>Width</label>
          </td>
          <td>
            <input type="number" ref={widthRef} defaultValue="0.2" />
          </td>
        </tr>
        <tr>
          <td>
            <label>Depth</label>
          </td>
          <td>
            <input type="number" ref={depthRef} defaultValue="0.2" />
          </td>
        </tr>
        <tr>
          <td>
            <label>Gap</label>
          </td>
          <td>
            <input type="number" ref={gapRef} defaultValue="0" />
          </td>
        </tr>
        <tr>
          <td>
            <label>Color</label>
          </td>
          <td>
            <input type="color" ref={colorRef1} defaultValue="#6B8CC0" />
            <input type="color" ref={colorRef2} defaultValue="#F6BECA" />
            <input type="color" ref={colorRef3} defaultValue="#E26A58" />
          </td>
        </tr>
      </table>
      <button
        onClick={() =>
          handleStyle({
            style: styleRef.current.value,
            width: widthRef.current.value,
            depth: depthRef.current.value,
            gap: gapRef.current.value,
            colors: [
              colorRef1.current.value,
              colorRef2.current.value,
              colorRef3.current.value,
            ],
          })
        }
        className="text-white"
      >
        Submit
      </button>
    </div>
  );
}
