import '../styles/globals.css'
import {SessionProvider} from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import {AppProps} from "next/app";
import {Session} from "next-auth";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

type EnhancedAppProps = AppProps<{ session: Session | null | undefined }>;

function MyApp({
                   Component,
                   pageProps,
               }: EnhancedAppProps) {
    return (
        <ChakraProvider>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ChakraProvider>
    )
}

export default MyApp
