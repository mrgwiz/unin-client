import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react';

import { Container } from '@chakra-ui/react';

import Header from '../../components/Header';
import Unin from '../../components/Unin';

import UninWeb3Client from '../../lib/web3UninClient';

const UninForOwner: NextPage = () => {
    const router = useRouter();

    const [unin, setUnin] = useState<Unin[]>([]);

    useEffect(() => {
        const address = router?.query?.address;
        if (!address) return;

        const addrStr = `${address}`;

        const web3Client = new UninWeb3Client();
        web3Client.getUnin(addrStr)
            .then(unin => setUnin(unin))
            .catch(err => console.error(err));
    }, [router.query.address]);

    return (
        <Container>
            <Header imgSrc="https://ipfs.io/ipfs/QmVN3QJJrwHREDYxTXBNi1RfhCA5pcVq8xL73No8DFtprf?filename=Backpack2.png" />
            {unin.length && <Unin unin={unin} />}
        </Container>
    );
}

export default UninForOwner;
