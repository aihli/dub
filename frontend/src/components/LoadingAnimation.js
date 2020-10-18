import React from "react";
import gsap from "gsap";
import happy from "../images/happy.png";
import mildHappy from "../images/mild-happy.png";
import mildSad from "../images/mild-sad.png";
import neutral from "../images/neutral.png";
import sad from "../images/sad.png";

const LoadingAnimation = () => {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.1 });
  tl.to("#happy", { duration: 1, rotation: 360, ease: "bounce" });
  tl.to("#mild_happy", { duration: 1, rotation: 360, ease: "elastic" });
  tl.to("#neutral", { duration: 1, rotation: 360, ease: "power3" });
  tl.to("#mild_sad", { duration: 1, rotation: 360, ease: "power4" });
  tl.to("#sad", { duration: 10, rotation: 360, ease: "slow" });

  return (
    <div className="flex-container">
      <div>
        <img id="happy" src={happy} width={100} height={100} />
        <img id="mild_happy" src={mildHappy} width={100} height={100} />
        <img id="neutral" src={neutral} width={100} height={100} />
      </div>
      <div>
        <img id="mild_sad" src={mildSad} width={100} height={100} />
        <img id="sad" src={sad} width={100} height={100} />
      </div>
    </div>
  );
};

export default LoadingAnimation;
