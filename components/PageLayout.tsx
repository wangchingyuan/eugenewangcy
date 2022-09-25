import React from "react";
import { ReactNode, useEffect } from "react"
import { ThemeContext } from "./ThemeContext";


export default function PageLayout({ children }:{children: ReactNode}) {

  const {themeState, setTheme} = React.useContext(ThemeContext);

  // use user's previous theme setting. If first vist, use system's theme setting
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const localGet = localStorage.getItem('theme')
    const localTheme = localGet === "undefined" ? null : localGet
    const userTheme = localTheme || systemTheme
    setTheme(userTheme)
  }, [])

  return (
    <div className={`h-full text-theme-${themeState}-TXT bg-theme-${themeState}-BG`}>
      {children}
    </div>
  )
}
