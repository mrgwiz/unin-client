import { NextPage } from "next";
import {
    Container,
    Divider,
    Heading,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack
} from "@chakra-ui/react";
import Header from "../../components/Header";

const Docs: NextPage = () => {
    return (
        <Container>
            <Header imgSrc="https://ipfs.io/ipfs/QmPkvPWE5wAiQL57nR5mW6oV3A31akdKZzuKbTj6WoHXfH?filename=UninLogo.png" />
            <VStack alignItems={"flex-start"}>
                <Heading as={"h2"} size="md">API Documentation</Heading>

                <VStack alignItems={"flex-start"} width="100%" paddingTop="16px">
                    <Heading as={"h3"} size="sm">/items/owner/:owner</Heading>
                    <p>
                        Returns all items owned by the given owner.
                    </p>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Param</Th>
                                <Th>Type</Th>
                                <Th>Description</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>:owner</Td>
                                <Td>string</Td>
                                <Td>The owner of the items</Td>
                            </Tr>
                        </Tbody>
                        <TableCaption>Parameters</TableCaption>
                    </Table>
                    <pre style={{
                        backgroundColor: "#333",
                        borderRadius: "16px",
                        color: "#eee",
                        fontSize: "12px",
                        padding: "8px",
                        width: "100%"
                    }}>
                        {JSON.stringify([
                            {
                                "owner": "0xOwnerWalletAddress",
                                "type": 1,
                                "attrs": [15, 0, 0, 15, 0, 70, 0],
                                "name": "Item Name",
                                "description": "Item Description"
                            }
                        ], null, 2)}
                    </pre>
                </VStack>
                <Divider />

                <VStack alignItems={"flex-start"} width="100%" paddingTop="16px">
                    <Heading as={"h3"} size="sm">/items/:id</Heading>
                    <p>
                        Returns the item with the given id.
                    </p>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Param</Th>
                                <Th>Type</Th>
                                <Th>Description</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>:id</Td>
                                <Td>string</Td>
                                <Td>ID of the item</Td>
                            </Tr>
                        </Tbody>
                        <TableCaption>Parameters</TableCaption>
                    </Table>
                    <pre style={{
                        backgroundColor: "#333",
                        borderRadius: "16px",
                        color: "#eee",
                        fontSize: "12px",
                        padding: "8px",
                        width: "100%"
                    }}>
                        {JSON.stringify({
                            "owner": "0xOwnerWalletAddress",
                            "type": 1,
                            "attrs": [15, 0, 0, 15, 0, 70, 0],
                            "name": "Item Name",
                            "description": "Item Description"
                        }, null, 2)}
                    </pre>
                </VStack>
                <Divider />
            </VStack>
        </Container>
    );
}

export default Docs;
