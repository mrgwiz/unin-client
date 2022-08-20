import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react';

import { Container } from '@chakra-ui/react';

import Header from '../../components/Header';
import Inventory from '../../components/Inventory';

import uninApi from '../../lib/uninApi';

const InventoryForOwner: NextPage = () => {
    const router = useRouter();
    const [status, setStatus] = useState<string>('');

    const [inventory, setInventory] = useState<Item[]>([]);

    useEffect(() => {
        const address = router?.query?.address;
        if (!address) return;

        setStatus('Loading...');

        const addrStr = `${address}`;
        uninApi.getItemsForOwner(addrStr)
            .then(inventory => {
                if (!inventory.length)
                    return setStatus('No items found.');
                setInventory(inventory);
            })
            .catch(err => {
                console.error(err)
                setStatus('Error loading inventory.');
            });
    }, [router.query.address]);

    return (
        <Container>
            <Header imgSrc="https://ipfs.io/ipfs/QmUetu9vGG3q2yymcyC3M2vNovMJ6nSrJpYjCZ4f3eRyAY?filename=Backpack1.png" />
            {inventory.length ? <Inventory items={inventory} /> : <div>{status}</div>}
        </Container>
    );
}

export default InventoryForOwner;
