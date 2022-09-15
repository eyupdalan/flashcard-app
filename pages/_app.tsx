import '../styles/globals.css'
import type {AppProps} from 'next/app';
import {SessionProvider} from "next-auth/react"
import {FluentProvider, teamsLightTheme} from '@fluentui/react-components';

function MyApp({
                   Component,
                   pageProps: {session, ...pageProps}
               }: AppProps) {
    return (
        <FluentProvider theme={teamsLightTheme}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </FluentProvider>
    )
}

export default MyApp
