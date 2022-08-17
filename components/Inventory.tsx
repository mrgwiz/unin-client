import { useRouter } from 'next/router'

import {
    Box,
    Grid,
    GridItem,
    Heading,
    HStack,
    VStack
} from '@chakra-ui/react';

import { makeLinearGradient } from '../lib/colors';

interface Props {
    items: Item[];
}

const Inventory = ({ items }: Props) => {
    const router = useRouter();

    return (
        <Box>
            <Heading as="h2" size="1xl">Inventory</Heading>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                {items.map((item, index) => {
                    const gradient = makeLinearGradient(item.attrs);
                    return (
                        <GridItem key={index}
                            alignItems={"center"}
                            display="flex"
                            flexDirection={"column"}
                            height="32"
                            justifyContent="center"
                            width="100%"
                            onClick={() => {
                                router.push(`/item/${item.itemId}`)
                            }}
                        >
                            <Box
                                background={gradient}
                                height="100%"
                                rounded="lg"
                                width="100%"
                            />
                            <VStack>
                                <span>{item.name}</span>
                                <HStack>
                                    <span><strong>{item.type}</strong></span>
                                    <span>{item.attrs.join(' ')}</span>
                                </HStack>
                            </VStack>
                        </GridItem>
                    );
                })}
            </Grid>
        </Box>
    );
}

export default Inventory;
