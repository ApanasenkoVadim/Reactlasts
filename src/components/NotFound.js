import React from "react";
import "../style/notfound.css"
import not from "../img/not.svg"
const NotFound = () => {
  return (
    <div className="notfound">
      <h1>
        4<span><img src={not} alt="cactus" style={{ verticalAlign: "middle" }} /></span>4
      </h1>
      <h2>Page Not Found</h2>
      <p>We're sorry, the page you requested could not be found.</p>
      <button
        onClick={() => (window.location.href = "/")}
        className="bnt-notfound"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;