import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { classNameByTheme } from "../util/themedClassName";

export default function Contact() {

    const {themeState} = useContext(ThemeContext);

    const mainDivClassName = classNameByTheme(
        themeState,
        'text-center m-10 text-lg rounded-lg border border-white pt-3 pb-3 w-1/2 m-auto', 
        'text-center m-10 text-lg rounded-lg border border-black pt-3 pb-3 w-1/2 m-auto', 
        'text-center m-10 text-lg rounded-lg border border-black pt-3 pb-3 w-1/2 m-auto' 
    )
    
    

    return (<>
    <div className={mainDivClassName}>
        <p>
            &#128279; 
            <u><a href='https://www.linkedin.com/in/eugenewangcy'>LinkedIn</a></u>
        </p>
        <p>
            &#128279; 
            <u><a href='https://twitter.com/eugenewangcy'>Twitter</a></u>
        </p>
        <p>
            &#128279; 
            <u><a href='https://github.com/wangchingyuan'>Github</a></u>
        </p>

        <p 
        className="text-center bottom-0 mt-8">
            Feel free to add me, whoever you are!
        </p>
        {/* <Loader /> */}
    
        
        
    
    </div>
    </>)
}