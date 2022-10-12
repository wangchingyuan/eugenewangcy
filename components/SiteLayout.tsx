import { ReactNode, useEffect, useContext, useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import PageLayout from './PageLayout'
import { ThemeContext } from "./ThemeContext";

export default function SiteLayout({ children }:{children:ReactNode}) {
  
  const {themeState, setTheme} = useContext(ThemeContext);

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
    dark : `text-theme-warm-TXT bg-theme-warm-BG
      h-screen w-screen relative grid grid-rows-[auto_1fr]`,
    light : `text-theme-warm-TXT bg-theme-warm-BG
      h-screen w-screen relative grid grid-rows-[auto_1fr]`,
    warm : `text-theme-warm-TXT bg-theme-warm-BG 
      h-screen w-screen relative grid grid-rows-[auto_1fr]`
  }

  return (
  <div className={themeClassname[themeState]}>
    <Navbar/>
    <PageLayout>
      {children}
    </PageLayout>
    {/* <Footer/> */}
  </div>
)}