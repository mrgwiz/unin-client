import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react';

import { Container } from '@chakra-ui/react';

import Header from '../../components/Header';
import Inventory from '../../components/Inventory';

import uninApi from '../../lib/uninApi';
import UninWeb3Client from '../../lib/web3UninClient';

const InventoryForOwner: NextPage = () => {
    const router = useRouter();

    const [inventory, setInventory] = useState<Item[]>([]);

    useEffect(() => {
        const address = router?.query?.address;
        if (!address) return;

        const addrStr = `${address}`;
        uninApi.getItemsForOwner(addrStr)
            .then(inventory => setInventory(inventory))
            .catch(err => console.error(err));
    }, [router.query.address]);

    return (
        <Container>
            <Header imgSrc="https://ipfs.io/ipfs/QmUetu9vGG3q2yymcyC3M2vNovMJ6nSrJpYjCZ4f3eRyAY?filename=Backpack1.png" />
            {inventory.length && <Inventory items={inventory} />}
        </Container>
    );
}

export default InventoryForOwner;
