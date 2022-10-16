import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { classNameByTheme } from "../util/themedClassName";

export default function Projects() {

    const {themeState} = useContext(ThemeContext);

    let projTileClassName = classNameByTheme(
        themeState,
        'rounded-lg border border-spacing-1 p-1 m-auto w-2/3 border-white', //bg-zinc-600 
        'rounded-lg border border-spacing-1 p-1 m-auto w-2/3 border-black', //bg-gray-400
        'rounded-lg border border-spacing-1 p-1 m-auto w-2/3 border-black' //bg-white 
    )

    return (
    <div className="grid grid-rows-[auto_auto_auto] p-10 gap-12">

        <div className={projTileClassName}>
            <Link href="https://www.eugenewangcy.com">
                <p className='font-bold'>eugenewangcy.com</p>
            </Link>
            <p>&quot;More than just a personal site.&quot;</p>
            <a href="https://docs.google.com/document/d/17ARQfITjiHuhjzRYNAV12xecAJb2ZfKuOMymTYhaD8Q/edit">
                &#128279; See Design Doc</a>
            <p>Went live Oct 2022. Further improvements coming.&#128295;</p>
        </div>

        <div className={projTileClassName}>
            <Link href="https://www.relivemytrades.com">
                <p className='font-bold'>relivemytrades.com</p>
            </Link>
            <p>&quot;So you don&apos;t believe in efficient market hypothesis?&quot;</p>
            <a href="https://docs.google.com/document/d/1QGz1JDxxNWvPa-z1w-F24XJanx3jWtuWoXAgHFuDaAs/edit">
                &#128279; See Design Doc</a>
            <p>TO BE STARTED</p>
            
        </div>
        <div className={projTileClassName}>
            <Link href="https://www.youneedarock.com">
                <p className='font-bold'>youneedarock.com</p>
            </Link>
            <p>&quot;Nice looking e-commerce site where you can buy a rock.&quot;</p>
            <a href="https://docs.google.com/document/d/19OJOOXG1ScEMN1eKNUyQ1Ut8ySJsyz3f0SeGdBLZkHI/edit">
                &#128279; See Design Doc</a>
            <h1>TO BE STARTED</h1>
        </div>
    </div>

    )
}
