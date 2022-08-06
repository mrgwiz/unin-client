import type { NextPage } from 'next'
import Head from 'next/head'

import {
    Container,
    Heading,
    VStack
} from '@chakra-ui/react';

import Menu from '../components/Menu';

const Home: NextPage = () => {
    return (
        <Container className="main">
            <Head>
                <title>The Universal Inventory System</title>
                <meta name="description" content="Your inventory across the metaverse." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack>
                <Heading size="2xl" as="h1">UNIN</Heading>

                <p>Your inventory across the metaverse.</p>

                <Menu showHome={false} />
            </VStack>
        </Container>
    )
}

export default Home
