export default function Overlay({ color, opacity }) {
  return (
    <div
      className={`w-screen h-screen bg-[${color}] bg-opacity-${opacity}`}
    ></div>
  );
}
