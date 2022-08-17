import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import {
    Container,
    Heading,
    VStack
} from '@chakra-ui/react';

import Menu from '../components/Menu';
import Footer from '../components/Footer';

const Home: NextPage = () => {
    return (
        <Container className="main">
            <Head>
                <title>The Universal Inventory System</title>
                <meta name="description" content="Your inventory across the metaverse." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack>
                <img src="https://ipfs.io/ipfs/QmPkvPWE5wAiQL57nR5mW6oV3A31akdKZzuKbTj6WoHXfH?filename=UninLogo.png" alt="Unin Logo" width="246" height="242" />
                <Heading size="2xl" as="h1">UNIN</Heading>

                <p>Your inventory across the metaverse.</p>

                <Menu showHome={false} />

                <Footer />
            </VStack>
        </Container>
    )
}

export default Home
