import React, { useEffect } from "react";
import history from "../utils/history";

export const ScrollToTop:React.FC = () => {
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

