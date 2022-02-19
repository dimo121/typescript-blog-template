import React from "react";
import img from "../images/packt.jpg";
import img2 from "../images/udemy.png";
import img3 from "../images/react-logo.png";

const Partners:React.FC = () => (
    <div className="s8-sc">
      <ul>
        <li>
          <h1>Meet our partners</h1>
        </li>
        <br/>
        <li>
          <h1>Packt.com</h1>
        </li>
        <span>
          <img
            src={img}
            alt="packt-publishing"
            style={{ height: "30rem", width: "80rem", marginTop: "20px" }}
          ></img>
        </span>
        <li>
          <h1>Udemy.com</h1>
        </li>
        <span>
          <img
            src={img2}
            alt="udemy.com"
            style={{ height: "40rem", width: "80rem", marginTop: "20px" }}
          ></img>
        </span>
        <li>
          <h1>React JS</h1>
        </li>
        <span>
          <img
            src={img3}
            alt="reactjs.org"
            style={{ height: "45rem", width: "80rem", marginTop: "20px" }}
          ></img>
        </span>
      </ul>
    </div>
  );

  export default Partners;