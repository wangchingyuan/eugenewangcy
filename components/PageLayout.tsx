import React from "react";
import { ReactNode, useEffect } from "react"
import { ThemeContext } from "./ThemeContext";


export default function PageLayout({ children }:{children: ReactNode}) {

  const {themeState, setTheme} = React.useContext(ThemeContext);

  // use user's custom theme setting. On first vist, use system's theme setting
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const localGet = localStorage.getItem('theme')
    const localTheme = localGet === "undefined" ? null : localGet
    const userTheme = localTheme || systemTheme
    setTheme(userTheme)
    console.log('effect used')
  }, [])

  // For dynamic classnames, string interpolation doesn't work, always use FULL classnames
  const themeClassname: {[key:string] : string} = {
    dark : 'h-full text-theme-dark-TXT bg-theme-dark-BG',
    light : 'h-full text-theme-light-TXT bg-theme-light-BG',
    warm : 'h-full text-theme-warm-TXT bg-theme-warm-BG'
  }

  return (
    <div className={themeClassname[themeState]}>
      {children}
    </div>
  )
}
