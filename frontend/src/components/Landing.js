import Overlay from "./Overlay";

export default function Landing({ x }) {
  return (
    <div className="block w-screen h-screen">
      <h1>{x}</h1>
      <Overlay color="#000000" opacity="50" />
    </div>
  );
}
