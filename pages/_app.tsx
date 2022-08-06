import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

import { store } from '../store';
import theme from '../theme';

function Unin({ Component, pageProps }: AppProps) {
    return (
        <ReduxProvider store={store}>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} height="100%" />
            </ChakraProvider>
        </ReduxProvider>
    )
}

export default Unin;
