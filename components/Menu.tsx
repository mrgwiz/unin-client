import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import colors from '../lib/colors';

import {
    Button,
    HStack,
    useColorMode
} from '@chakra-ui/react';

import Connect from './Connect';

type Props = {
    showHome?: boolean
}

const Menu = ({ showHome = true }:Props) => {
    const { colorMode, toggleColorMode } = useColorMode()

    const selectedAddress = useSelector((state:RootState) => state.web3.selectedAddress);

    return (
        <HStack spacing={4} marginTop={4} marginBottom={4}>
            <Connect />
            {showHome && <Link key={0} href="/"><Button variant={"link"} color={colors.red}>Home</Button></Link>}
            {selectedAddress && [
                <Link key={1} href="/item"><Button variant={"link"} color={colors.green}>Create</Button></Link>,
                <Link key={2} href={`/unin/${selectedAddress}`}><Button variant={"link"} color={colors.blue}>UNIN</Button></Link>,
                <Link key={3} href={`/inventory/${selectedAddress}`}><Button variant={"link"} color={colors.purple}>Inventory</Button></Link>,
            ]}
            <Link key={4} href={`/docs`}><Button variant={"link"} color={colors.pink}>Docs</Button></Link>
            <Button onClick={toggleColorMode} style={{ position: 'absolute', top: 8, right: 8 }} variant="unstyled">🌓</Button>
        </HStack>
    );
}

export default Menu;
