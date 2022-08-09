import { useRouter } from 'next/router'
import type { NextPage } from 'next'

import { useEffect, useState } from 'react';

import { makeLinearGradient } from '../../lib/colors';

import uninApi from '../../lib/uninApi';
import Web3UninClient from'../../lib/web3UninClient';

const MAX_SIZE_NAME = 64;
const MAX_SIZE_DESCRIPTION = 256;

import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Input,
    Textarea,
    VStack
} from '@chakra-ui/react';

import Header from '../../components/Header';
import Messages from '../../components/Messages';

import { useDispatch } from 'react-redux';
import { addMessage } from '../../store/reducers/messages';

const Item: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const [unin, setUnin] = useState<Unin>({
        tokenId: '',
        type: 1,
        attrs: [0, 0, 0, 0, 0, 0, 0]
    });
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (!router.query.tokenId)
            return;
        getItemInfo();
        getUninInfo();
    }, [router.query.tokenId]);

    function getUninInfo() {
        const tokenId = router.query.tokenId;
        if (!tokenId) return;

        const uninClient = new Web3UninClient();

        const contract = uninClient.getContract();
        if (!contract) return false;

        uninClient.getUninByTokenId(`${tokenId}`)
            .then((unin:Unin) => {
                setUnin(unin);
            })
            .catch(err => console.error(err));
    }

    function getItemInfo() {
        const tokenId = router.query.tokenId;
        if (!tokenId) return;

        uninApi.getItem(tokenId.toString())
            .then((item) => {
                if (!item) return;

                setIsRegistered(true);
                setName(item.name);
                setDescription(item.description);
            })
            .catch(err => console.error(err));        
    }

    async function registerItem() {
        const uninClient = new Web3UninClient();

        const contract = uninClient.getContract();
        if (!contract) return false;

        const message = "Update token";
        const signature = await uninClient.signMessage(message);

        uninApi.registerItem(
            router.query.tokenId.toString(),
            message,
            signature,
            name,
            description
        ).then((result) => {
            if (!result)
                throw new Error('Error registering UNIN.');
            dispatch(addMessage({ type: 'success', message: 'Item registered successfully.' }));
            console.log('Item registered');
        })
        .catch(err => {
            dispatch(addMessage({ type: 'error', message: err.message }));
            console.error(err)
        });
    }

    async function claimItem() {
        const uninClient = new Web3UninClient();

        const contract = uninClient.getContract();
        if (!contract) return false;

        const message = "Claim token";
        const signature = await uninClient.signMessage(message);

        uninApi.claimItem(
            router.query.tokenId.toString(),
            message,
            signature
        ).then((result) => {
            if (!result)
                throw new Error('Error claiming UNIN.');
            dispatch(addMessage({ type: 'success', message: 'Item claimed successfully.' }));
            console.log('Item claimed');
        }).catch(err => {
            dispatch(addMessage({ type: 'error', message: err.message }));
            console.error(err)
        });
    }

    useEffect(() => {
        const tokenId = router?.query?.tokenId;
        if (!tokenId) return;

    }, [router.query.tokenId]);

    return (
        <Container>
            <Header />
            <Messages />
            <Heading size="1xl">{router.query.tokenId}</Heading>

            <VStack spacing={4} width="100%">
                <Box
                    height="64"
                    width="100%"
                    background={makeLinearGradient(unin.attrs)}
                    rounded="lg"
                />

                <VStack spacing="2" width="100%">
                    <Input placeholder="Name" value={name} onChange={(e) => {
                        if (e.target.value.length > MAX_SIZE_NAME) return;
                        setName(e.target.value);
                    }} disabled={isRegistered} />
                    <Flex
                        fontSize={'sm'}
                        justifyContent="flex-end"
                        width="100%"
                    >{name.length} / {MAX_SIZE_NAME}</Flex>

                    <Textarea placeholder="Description" value={description} onChange={(e) => {
                        if (e.target.value.length > MAX_SIZE_DESCRIPTION) return;
                        setDescription(e.target.value);
                    }} disabled={isRegistered} />
                    <Flex
                        fontSize={'sm'}
                        justifyContent="flex-end"
                        width="100%"
                    >{description.length} / {MAX_SIZE_DESCRIPTION}</Flex>

                    <HStack justifyContent="right" width="100%">
                        {!isRegistered
                            ? <Button onClick={registerItem}>Register</Button>
                            : <Button onClick={claimItem}>Claim</Button>
                        }
                    </HStack>
                </VStack>
            </VStack>
        </Container>
    );
}

export default Item
