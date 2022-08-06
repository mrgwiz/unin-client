import Head from 'next/head';
import {
    Heading
} from "@chakra-ui/react";
import Menu from "./Menu";

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
            <Heading as="h1" size="2xl">Universal Inventory</Heading>
            <Menu />
        </header>
    );
}

export default Header;
