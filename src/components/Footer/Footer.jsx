import React from "react";
import blizzardImg from "../../assets/img/blizzard.jpg";
import eaImg from "../../assets/img/electronic_arts.jpg";
import ubisoftImg from "../../assets/img/ubisoft.jpg";
import rockstarImg from "../../assets/img/rockstar.jpg";
import valveImg from "../../assets/img/valve.jpg";
import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__tagline">Incredible convenient</p>
        <div className="footer__icons-container">
          <a href="https://www.blizzard.com/en-us/" className="footer__link" rel="noreferrer" target="_blank">
            <img className="footer__img--large" src={blizzardImg} alt="Blizzard logo"></img>
          </a>
          <a href="https://www.ea.com/sports" className="footer__link" rel="noreferrer" target="_blank">
            <img className="footer__img" src={eaImg} alt="EA logo"></img>
          </a>
          <a href="https://www.ubisoft.com/en-us/" className="footer__link" rel="noreferrer" target="_blank">
            <img className="footer__img--medium" src={ubisoftImg} alt="Ubisoft logo"></img>
          </a>
          <a href="https://www.rockstargames.com/" className="footer__link" rel="noreferrer" target="_blank">
            <img className="footer__img" src={rockstarImg} alt="Rockstar logo"></img>
          </a>
          <a href="https://www.valvesoftware.com/en/" className="footer__link" rel="noreferrer" target="_blank">
            <img className="footer__img--large" src={valveImg} alt="Valve logo"></img>
          </a>
         </div>
    </footer>
  )
}

export default Footer;
