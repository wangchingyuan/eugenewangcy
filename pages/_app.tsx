import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SiteLayout from '../components/SiteLayout'
import ThemeContextProvider from '../components/ThemeContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <SiteLayout>
        <Component {...pageProps}/>
      </SiteLayout>
    </ThemeContextProvider>
  )
}
