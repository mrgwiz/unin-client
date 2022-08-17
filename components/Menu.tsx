import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import {
    HStack
} from '@chakra-ui/react';

import Connect from './Connect';

type Props = {
    showHome?: boolean
}

const Menu = ({ showHome = true }:Props) => {
    const selectedAddress = useSelector((state:RootState) => state.web3.selectedAddress);

    return (
        <HStack spacing={4} marginTop={4} marginBottom={4}>
            {showHome && <Link key={0} href="/">Home</Link>}
            {selectedAddress && [
                <Link key={1} href="/item">Create</Link>,
                <Link key={2} href={`/unin/${selectedAddress}`}>UNIN</Link>,
                <Link key={3} href={`/inventory/${selectedAddress}`}>Inventory</Link>
            ]}
            <Connect />
        </HStack>
    );
}

export default Menu;
