import Link from "next/link";
import React, { useContext } from "react";
import { classNameByTheme } from "../util/themedClassName";
import NavbarIcon from "./NavbarIcon";
import { themeMap, ThemeContext } from "./ThemeContext";

export default function Navbar() {

  const {themeState, setTheme, setNextTheme} = useContext(ThemeContext);

  const className = classNameByTheme(
    themeState,
    'bg-myDark-NAV',
    'bg-myWarm-NAV',
    'bg-myLight-NAV',
  )


  return (
    // <div className="bg-gray-300 p-1">
    <div className={className}>
      <div className="flex justify-evenly">
        <NavbarIcon name={'About'} url={'/'}/>
        <NavbarIcon name={'Blog'} url={'/blog'}/>
        <NavbarIcon name={'Projects'} url={'/projects'}/>
        <NavbarIcon name={'Contact'} url={'/contact'}/>
        <NavbarIcon name={'Theme'} onClick={setNextTheme}/>
      </div>
    </div>
  );
}

