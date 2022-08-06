import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import { setSelectedAddress } from '../store/reducers/web3';
import { RootState } from '../store';

import Web3UninClient from '../lib/web3UninClient';

import {
    Button
} from '@chakra-ui/react';
import { useEffect } from 'react';

const Connect = () => {
    const dispatch = useDispatch();
    const selectedAddress = useSelector((state:RootState) => state.web3.selectedAddress);

    useEffect(() => {
        (() => {
            const uninClient = new Web3UninClient();
            const address = uninClient.getSelectedAddress();
            dispatch(setSelectedAddress(address));
        })();
    }, []);

    async function connect() {
        const uninClient = new Web3UninClient();
        await uninClient.connect()
            .then((selectedAddress) => {
                dispatch(setSelectedAddress(selectedAddress));
            })
            .catch((err) => console.error(err));
    }

    const btn = (selectedAddress && selectedAddress.length)
        ? <></>
        : <Button onClick={connect}>Connect</Button>;

    return(btn);
}

export default Connect;
