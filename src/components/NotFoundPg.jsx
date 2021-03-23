import React from "react";
import { useLocation } from "react-router";
import notFoundImg from "../assets/img/not-found.png";

export default function NotFoundPg() {
  let location = useLocation();

  return (
    <div className="not-found">
      <img className="not-found__image" src={notFoundImg} alt="Not found"></img>
      <h2 className="page-title--not-found">Page <code>{location.pathname}</code> does not exist</h2>
    </div>
  )
}
