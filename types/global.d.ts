type RawUnin = {
    tokenId: string;
    uri: string;
}

type Unin = {
    tokenId: string;
    type: number;
    attrs: number[];
}

type Item = {
    itemId: string;
    owner: string;
    type: number;
    attrs: number[];
    name: string;
    description: string;
}
