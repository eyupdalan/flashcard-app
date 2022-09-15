import '../styles/globals.css'
import {SessionProvider} from "next-auth/react"
import {FluentProvider, teamsLightTheme} from '@fluentui/react-components';
import {AppProps} from "next/app";
import {Session} from "next-auth";

function MyApp({
                   Component,
                   pageProps,
               }: AppProps<{
    session: Session | null | undefined;
}>) {
    return (
        <FluentProvider theme={teamsLightTheme}>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </FluentProvider>
    )
}

export default MyApp
