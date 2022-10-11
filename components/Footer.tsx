import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function Footer() {

    const {themeState, setTheme} = useContext(ThemeContext);

    const themeClassname: {[key:string] : string} = {
        dark : ' text-theme-dark-TXT bg-theme-dark-BG bottom-0 w-screen',
        light : ' text-theme-light-TXT bg-theme-light-BG bottom-0 w-screen',
        warm : ' text-theme-warm-TXT bg-theme-warm-BG bottom-0 w-screen'
      }

    return (
        <div className={themeClassname[themeState]}>
            This is the footer
        </div>
    )
}
