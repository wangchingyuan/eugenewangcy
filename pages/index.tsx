import Link from "next/link"
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { classNameByTheme } from "../util/themedClassName";

export default function About() {


  const {themeState} = useContext(ThemeContext);

  const mainDivClassName = classNameByTheme(
      themeState,
      'rounded-lg border border-white mt-5 pt-3 pb-3 w-2/3 ml-auto mr-auto', 
      'rounded-lg border border-black mt-5 pt-3 pb-3 w-2/3 ml-auto mr-auto', 
      'rounded-lg border border-black mt-5 pt-3 pb-3 w-2/3 ml-auto mr-auto' 
  )

  const pClassName = 'text-center pt-1 pb-1 m-auto'

  return (
    <div className={mainDivClassName}>
      <p className='text-left, pt-1 pb-1 ml-6'>
        Dear visitor,</p>
        <br/>
      <p className={pClassName}>
        Welcome to my personal site!   &#129302;</p>
      <p className={pClassName}>
        I&apos;m Eugene, a software engineer.<br/></p>

      <br/><br/>
      <p className={pClassName}>
        I write about my projects on my <u><Link href='/blog'>blog</Link></u>. &#129495;<br/></p>

      <br/><br/>
      <p className={pClassName}>
        My goal is to find a new job in Cali and move there in 2023.</p>
      <p className={pClassName}>
        Feel free add <u><Link href='/contact'>my socials</Link></u> or drop any advice!! &#129309;</p>
      
      <br/><br/><br/>
      <p className={pClassName}>
        Went live on Octotor 15th 2022.<br/>
        More changes coming!</p>
    </div>

  )
}