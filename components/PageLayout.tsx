
import React, { ReactNode, useEffect, useContext } from "react"
import { classNameByTheme } from "../util/themedClassName";
import { ThemeContext } from "./ThemeContext";


export default function PageLayout({ children }:{children: ReactNode}) {

  const { themeState } = useContext(ThemeContext);

  const themeClassname = classNameByTheme(
    themeState,
    'relative text-myDark-TXT bg-myDark-BG md:p-8 sm:p-5',
    'relative text-myLight-TXT bg-myLight-BG md:p-8 sm:p-5',
    'relative text-myWarm-TXT bg-myWarm-BG md:p-8 sm:p-5'
)
//"prose-p:text-pink-700 prose-headings:bg-green-300"
  return (
    <div className={themeClassname}>
      {children} 
    </div>
  )
}
