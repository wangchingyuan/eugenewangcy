import Link from "next/link";
import React from "react";
import { themeMap, ThemeContext } from "./ThemeContext";

export default function Navbar() {

  const {themeState, setNextTheme} = React.useContext(ThemeContext);

  return (
    <div className="bg-gray-300 p-2">
      <div className="flex justify-evenly">
        <Link href="/">
          <div className="">
              <button>Home</button>
          </div>
        </Link>
        <Link href="/blog">
          <div className="">
              <button>Blog</button>
          </div>
        </Link>
        <Link href="/projects">
          <div className="">
              <button>Projects</button>
          </div>
        </Link>
        <Link href="/contact">
          <div className="">
              <button>Contact</button>
          </div>
        </Link>

        <div>
          <button onClick={()=>setNextTheme()}>Switch-Theme</button>
        </div>

      </div>
    </div>
  );
}

