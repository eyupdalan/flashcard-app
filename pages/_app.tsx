import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
