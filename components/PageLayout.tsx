
import React, { ReactNode, useEffect, useContext } from "react"
import { ThemeContext } from "./ThemeContext";


export default function PageLayout({ children }:{children: ReactNode}) {

  const {themeState, setTheme} = useContext(ThemeContext);

  const themeClassname: {[key:string] : string} = {
    dark : 'relative text-theme-dark-TXT bg-theme-dark-BG',
    light : 'relative text-theme-light-TXT bg-theme-light-BG',
    warm : 'relative text-theme-warm-TXT bg-theme-warm-BG'
  }

  return (
    <div className={themeClassname[themeState]}>
      {children}
    </div>
  )
}
