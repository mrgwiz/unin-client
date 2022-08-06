import { useRouter } from 'next/router';

import {
    Box,
    Grid,
    GridItem,
    Heading,
    HStack
} from '@chakra-ui/react';

import colors from '../lib/colors';
import { makeLinearGradient } from '../lib/colors';

interface Props {
    unin: Unin[];
}

const Unin = ({ unin }: Props) => {
    const router = useRouter();
    return (
        <Box>
            <Heading as="h2" size="1xl">UNIN</Heading>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                {unin.map((item, index) => {
                    const gradient = makeLinearGradient(item.attrs);
                    return (
                        <GridItem key={index}
                            alignItems={"center"}
                            cursor="pointer"
                            display="flex"
                            flexDirection={"column"}
                            height="32"
                            justifyContent="center"
                            width="100%"
                            onClick={() => {
                                router.push(`/item/${item.tokenId}`)
                            }}
                        >
                            <Box
                                background={gradient}
                                height="100%"
                                rounded="lg"
                                width="100%"
                            />
                            <HStack>
                                <span><strong>{item.type}</strong></span>
                                <span>{item.attrs.join(' ')}</span>
                            </HStack>
                        </GridItem>
                    );
                })}
            </Grid>
        </Box>
    );
}

export default Unin;
