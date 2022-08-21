import Web3Client from "./web3Client";

import unin from '../Unin.json';


class Web3UninClient extends Web3Client {
    constructor() {
        super(process.env.NEXT_PUBLIC_WEB3_PROVIDER);
    }

    getContract() {
        return super.getContract('unin', unin.abi, process.env.NEXT_PUBLIC_UNIN_CONTRACT_ADDR);
    }

    createItem(type: number, attrs: number[]) {
        return new Promise(async (resolve, reject) => {
            try {
                const contract = this.getContract();
                if (!contract)
                    throw 'Could not get contract';

                this.getEthereum().request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: this.getSelectedAddress(),
                        to: process.env.NEXT_PUBLIC_UNIN_CONTRACT_ADDR,
                        data: contract.methods.mint(this.getSelectedAddress(), [type, ...attrs]).encodeABI(),
                        value: process.env.NEXT_PUBLIC_UNIN_ITEM_COST_HEX
                    }]
                })
                    .then(() => resolve(true))
                    .catch((error: string) => {
                        console.error(error);
                        reject(false)
                    });
            } catch (error) {
                console.error(error);
                reject(false);
            }
        });
    }

    getBalance(address: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const contract = this.getContract();
                const balance = await contract.methods.balanceOf(address).call();
                resolve(balance);
            } catch (error) {
                console.error(error);
                reject('Could not get balance');
            }
        });
    }

    getUninByTokenId(tokenId: string): Promise<Unin> {
        return new Promise<Unin>(async (resolve, reject) => {
            try {
                const contract = this.getContract();
                const uri = await contract.methods.tokenURI(tokenId).call();
                const unin = this.processRawUnin({ tokenId, uri});
                resolve(unin[0]);
            } catch (error) {
                console.error(error);
                reject('Could not get unin');
            }
        });
    }

    getUnin(address: string): Promise<Unin[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const contract = this.getContract();
                const balance = await this.getBalance(address);

                let tokens = [];
                for (var i = 0; i < balance; i++) {
                    const token = await contract.methods.tokenOfOwnerByIndex(address, i).call();
                    tokens.push(token);
                }

                let rawUnin: RawUnin[] = [];
                for (var i = 0; i < tokens.length; i++) {
                    let tokenId = tokens[i];
                    let uri = await contract.methods.tokenURI(tokenId).call();
                    rawUnin.push({ tokenId, uri });
                }

                let unins = this.processRawUnin(rawUnin);

                resolve(unins);
            } catch (e) {
                reject(e);
            }
        });
    }

    processRawUnin(rawUnin: RawUnin|RawUnin[]) {
        if (!Array.isArray(rawUnin))
            rawUnin = [rawUnin];
        let unins: Unin[] = [];
        for (let i = 0; i < rawUnin.length; i++) {
            const [type, ...attrs] = rawUnin[i].uri.split(',');
            let unin = {
                tokenId: rawUnin[i].tokenId,
                type: parseInt(type),
                attrs: [...attrs.map(a => parseInt(a))]
            }
            unins.push(unin);
        }
        return unins;
    }
}

export default Web3UninClient;
