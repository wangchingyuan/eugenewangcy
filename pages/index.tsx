import Link from "next/link"

export default function About() {

  const pClassName = 'p-1'

  return (
    <div className="text-center text-lg">
      <p className={pClassName}>
        This is Eugene (Chingyuan)<br/></p>
      <p className={pClassName}>
        Welcome to my personal site! &#129302;</p>

      <br/>
      <br/>
      <br/>
      <p className={pClassName}>
        I write about my coding on my <u><Link href='/blog'>blog</Link></u>. &#129495;<br/></p>

      <br/><br/><br/>
      <p className={pClassName}>
        My goal is to find a new job in Cali and move there in 2023.</p>
      
      <p className={pClassName}>
        Feel free <u><Link href='/contact'>add my socials</Link></u> or drop any advice!! &#129309;</p>
      

      <p className='absolute w-full text-center bottom-0 mb-2'>
        Went live on <u><Link href='/contact'>Octotor 15th 2022.</Link></u><br/>
        More improvements coming.</p>

    </div>
  )
}