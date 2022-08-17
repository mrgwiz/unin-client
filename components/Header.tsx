import Head from 'next/head';
import {
    Heading, HStack
} from "@chakra-ui/react";
import Menu from "./Menu";
import Image from 'next/image';

type Props = {
    title?: string,
    description?: string
    imgSrc?: string
}

const Header = ({ title, description, imgSrc }:Props) => {
    title ||= "The Universal Inventory System";
    description ||= "Your inventory across the metaverse.";

    return (
        <header>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <Heading as="h1" size="2xl">
                <HStack alignContent="center">
                    {imgSrc && <img src={imgSrc} alt="Unin Logo" width="32px" height="32px" />}
                    <span>Universal Inventory</span>
                </HStack>
            </Heading>
            <Menu />
        </header>
    );
}

export default Header;
