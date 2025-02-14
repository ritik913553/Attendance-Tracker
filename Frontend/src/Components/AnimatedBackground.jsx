import Lottie from "lottie-react";
import animationOne from "../assets/2.json";
import animationTwo from "../assets/3.json";
const AnimatedBackground = () => {
  return (
    <div
      className="block sm:hidden w-full h-40 relative"
    >
      <div className="block sm:hidden absolute opacity-100 top-[-30%]  right-[1%] -translate-x-[50%] -translate-y-[50%]">
      <Lottie
          animationData={animationTwo}
          loop={true}
          className="absolute top-10 right-0 w-60 h-40"
        />
      </div>
      <div className="block sm:hidden absolute opacity-100 top-[0%] left-[-10%] right-[-20%] -translate-x-[50%] -translate-y-[50%]">
      <Lottie
          animationData={animationOne}
          loop={true}
          className="absolute top-0 right-10 w-40 h-40"
        />
      </div>
      
    </div>
  );
};
export default AnimatedBackground;
