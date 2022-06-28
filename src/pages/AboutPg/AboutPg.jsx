import { useEffect } from "react";
import "./styles.scss";

const AboutPg = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="about">
      <h2 className="page-title">About page</h2>
    </div>
  );
};

export default AboutPg;
