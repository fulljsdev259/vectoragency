import React from "react";
import logo from "../assets/images/logo.png";

export default function Header({heading}) {
  return (
    <header className="app-header">
      <img className="logo-img" src={logo} alt="logo" />
      <div className='header-content-wrapper'>
        <span className="app-name">Vector Agency </span>
        <span className="slash"> / </span>
        <span className="route-name"> {heading}</span>
      </div>
    </header>
  );
}
