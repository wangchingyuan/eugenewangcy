import React, { createContext, useState, ReactNode } from "react";

export const themeMap: {[key: string]: string} = {
    dark: "light",
    light: "warm",
    warm: "dark"
};

const defaultContext = {
    themeState:'',
    setTheme:(value: React.SetStateAction<string>) => {},
    setNextTheme:()=>{}
};
export const ThemeContext = createContext(defaultContext);

export default function ThemeContextProvider({ children }:{children: ReactNode}) {
    
    const currTheme = "light"
    const [themeState, setTheme] = useState(currTheme)
    const setNextTheme = () => {
        setTheme((prevTheme) => {
            localStorage.setItem('theme', themeMap[prevTheme])
            return themeMap[prevTheme]
        });
        console.log('setNexTheme ')
    }

    return (
        <ThemeContext.Provider value={{
            themeState:themeState, 
            setTheme:setTheme,
            setNextTheme:setNextTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};