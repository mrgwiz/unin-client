import Web3 from 'web3';
import { type Contract } from 'web3-eth-contract'; 
import { type WebsocketProvider } from 'web3-provider-engine';

export default class Web3Client {
    web3: Web3;
    contracts: {[key:string]:Contract};

    constructor(endpoint:string) {
        this.contracts = {};

        const provider:WebsocketProvider = new Web3.providers.WebsocketProvider(endpoint);
        this.web3 = new Web3(provider);
    }

    connect() {
        return new Promise<string>(async (resolve, reject) => {
            try {
                if (!(window as any).ethereum)
                    return reject("No web3 provider found");

                await (window as any).ethereum.request({ method: "eth_requestAccounts" });

                resolve(this.getSelectedAddress());
            } catch (error) {
                console.error(error);
                reject('Could not connect');
            }
        });
    }

    getWeb3() {
        return this.web3;
    }

    getContract(id:string, abi: any, address: string) {
        if (this.contracts[id])
            return this.contracts[id];

        const contract = new this.web3.eth.Contract(abi, address);
        this.contracts[id] = contract;

        return this.contracts[id];
    }

    getEthereum() {
        return (window as any).ethereum;
    }

    getSelectedAddress() {
        return (window as any).ethereum?.selectedAddress || null;
    }

    signMessage(message: string) {
        return new Promise(async (resolve, reject) => {
            if (!(window as any).ethereum)
                return reject('No web3 provider');

            const selectedAddress = this.getSelectedAddress();
            if (!selectedAddress)
                return reject('No selected address');

            const signature = await (window as any).ethereum.request({
                method: "personal_sign",
                params: [message, selectedAddress]
            });
            resolve(signature);
        });
    }
}
