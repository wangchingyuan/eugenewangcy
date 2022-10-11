import '../styles/globals.css'
import SiteLayout from '../components/SiteLayout'
import ThemeContextProvider from '../components/ThemeContext'
import { SessionProvider } from "next-auth/react"
import type { AppType } from 'next/app'
import type { Session } from "next-auth";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        <SiteLayout>
          <Component {...pageProps}/>
        </SiteLayout>
      </ThemeContextProvider>
    </SessionProvider>
  )
}

export default MyApp;
