import Loader from "./Loader";

export default function LoadingScreen() {
  return (
    <div className="fixed z-20 w-full h-screen top-0 left-0 bg-white bg-opacity-75 flex flex-col justify-center items-center space-y-5">
      <Loader />
    </div>
  );
};
