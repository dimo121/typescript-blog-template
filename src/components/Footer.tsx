import React from "react";
import { NavLink } from "react-router-dom";
import img from "../images/facebook_icon.svg";
import img2 from "../images/portfolio-icon.png";
import img3 from "../images/github-logo-cat.png";

export const Footer:React.FC = () => (
  <div className="s5-fc">
    <ul>
      <li>Follow me on: </li>
      <li>
        <a href="https://www.facebook.com">
          <p>Facebook</p>
          <span>
            <img
              src={img}
              alt="facebook"
              style={{ height: "3rem", width: "3rem" }}
            ></img>
          </span>
        </a>
      </li>
      <li>
        <a href="http://dimo-portfolio.net">
          <p>Portfolio</p>
          <span>
            <img
              src={img2}
              alt="portfolio"
              style={{ height: "3rem", width: "3rem", marginTop:"1rem" }}
            ></img>
          </span>
        </a>
      </li>
      <li>
        <a href="http://www.github.com/dimo121">
          <p>Github</p>
          <span>
            <img
              src={img3}
              alt="Github"
              style={{ height: "4rem", width: "5.5rem" }}
            ></img>
          </span>
        </a>
      </li>
      <li>
        <NavLink to="/contactus">
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/partners">
          Partners
        </NavLink>
      </li>
    </ul>
  </div>
);

