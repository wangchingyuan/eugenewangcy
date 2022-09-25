import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import PageLayout from './PageLayout'



export default function SiteLayout({ children }:{children:ReactNode}) {
  return (<div className="h-screen">
    <Navbar/>
      <PageLayout>
        {children}
      </PageLayout>
    <Footer/>
  </div>)}