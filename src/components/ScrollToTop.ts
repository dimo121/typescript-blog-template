import React, { useEffect } from "react";
//import { withRouter } from "react-router-dom";
import history from "../utils/history";

const ScrollToTop:React.FC = () => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
};

export default ScrollToTop;
