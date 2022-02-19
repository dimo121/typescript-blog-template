import React from "react";
import { NavLink } from "react-router-dom";
import img from "../images/facebook_icon.svg";
import img2 from "../images/twitter_icon.svg";
import img3 from "../images/instagram_icon.svg"

export const Footer:React.FC = () => (
  <div className="s5-fc">
    <ul>
      <li>Follow us on: </li>
      <li>
        <a href="http://www.facebook.com">
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
        <a href="http://www.twitter.com">
          <p>Twitter</p>
          <span>
            <img
              src={img2}
              alt="twitter"
              style={{ height: "3rem", width: "3rem" }}
            ></img>
          </span>
        </a>
      </li>
      <li>
        <a href="http://www.instagram.com">
          <p>Instagram</p>
          <span>
            <img
              src={img3}
              alt="Instagram"
              style={{ height: "5rem", width: "5rem" }}
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

