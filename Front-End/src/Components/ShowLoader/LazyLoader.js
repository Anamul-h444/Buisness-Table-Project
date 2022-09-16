import React from "react";
import "../../assets/css/progress.css";
import loaderImg from "../../assets/images/Infinity-1s-200px.svg";

const LazyLoader = () => {
  return (
    <div className="ProcessingDiv">
      <div className="center-screen">
        <img className="loader" src={loaderImg} />
      </div>
    </div>
  );
};

export default LazyLoader;
