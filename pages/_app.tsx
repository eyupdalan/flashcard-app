import '../styles/globals.css'
import {SessionProvider} from "next-auth/react"
import {Provider as FluentProvider, teamsTheme} from '@fluentui/react-northstar';
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
        <FluentProvider theme={teamsTheme}>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </FluentProvider>
    )
}

export default MyApp
