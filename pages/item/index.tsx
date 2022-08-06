import type { NextPage } from 'next';
import { useState } from 'react';

import {
    useDisclosure,
    Button,
    Container,
    Heading,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    VStack
} from "@chakra-ui/react";

import Header from '../../components/Header';
import Messages from '../../components/Messages';
import Select from '../../components/Select';
import Slider from '../../components/Slider';

import { colorNames } from '../../lib/colors';
import Web3UninClient from '../../lib/web3UninClient';

import { useDispatch } from 'react-redux';
import { addMessage } from '../../store/reducers/messages';

const MAX_TOTAL = 100;

const CreateItem: NextPage = () => {
    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [type, setType] = useState<number>(1);
    const [values, setValues] = useState<number[]>([15, 15, 15, 15, 15, 15, 10]);
    const [total, setTotal] = useState(100);

    function createItem() {
        const uninClient = new Web3UninClient();
        uninClient.createItem(type, values)
            .then(() => {
                dispatch(addMessage({ type: 'success', message: 'Item created successfully' }));
                console.log('Item created');
            })
            .catch(err => {
                dispatch(addMessage({ type: 'error', message: err.message }));
                console.error(err);
            })
            .finally(() => {
                onClose();
            });
    }

    const types = [
        { value: 1, label: 'Type 1' },
        { value: 2, label: 'Type 2' },
        { value: 3, label: 'Type 3' },
        { value: 4, label: 'Type 4' },
        { value: 5, label: 'Type 5' }
    ];

    function setValue(index: number, value: number) {
        const newValues = [...values];
        newValues[index] = value;
        const newTotal = newValues.reduce((acc, cur) => acc + cur, 0);
        if (newValues.reduce((acc, cur) => acc + cur, 0) <= MAX_TOTAL) {
            setValues(newValues);
            setTotal(newTotal);
        }
    }

    return (
        <Container>
            <Header />
            <Messages />
            <Heading as="h2" size="1xl">Create UNIN</Heading>

            <VStack>
                <HStack justifyContent="flex-end" width="100%">
                    <Select options={types} value={type} onChange={(value) => setType(value)} />
                </HStack>

                {values.map((value, index) => (
                    <HStack width="100%" key={index}>
                        <Slider
                            color={colorNames[index]}
                            onChange={(value) => setValue(index, value)} value={value}
                        />
                        <span>{values[index]}</span>
                    </HStack>
                ))}
                
                <HStack>
                    <span>{total} / {MAX_TOTAL}</span>
                </HStack>

                <Button onClick={onOpen} disabled={(total < MAX_TOTAL)}>Confirm Creation</Button>
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Creation</ModalHeader>
                    <ModalBody>
                        Current price is <strong>{process.env.NEXT_PUBLIC_UNIN_ITEM_COST_DEC}</strong> MATIC.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' onClick={createItem}>Create</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}

export default CreateItem;
