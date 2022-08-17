import Head from 'next/head';
import {
    Heading, HStack
} from "@chakra-ui/react";
import Menu from "./Menu";
import Image from 'next/image';

type Props = {
    title?: string,
    description?: string
}

const Header = ({ title, description }:Props) => {
    title ||= "The Universal Inventory System";
    description ||= "Your inventory across the metaverse.";

    return (
        <header>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <Heading as="h1" size="2xl">
                <HStack>
                    <Image src="/UninLogo.png" alt="Unin Logo" width="48px" height="48px" />
                    <span>Universal Inventory</span>
                </HStack>
            </Heading>
            <Menu />
        </header>
    );
}

export default Header;
