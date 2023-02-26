export default function Overlay({ color, opacity }) {
  return (
    <div
      className={`absolute backdrop-blur-md w-screen h-screen bg-black bg-opacity-50`}
    ></div>
  );
}
