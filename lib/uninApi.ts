import axios from 'axios';

export default {
    claimItem: async (tokenId: number, message: string, signature: string) => {
        return axios.post(`${process.env.NEXT_PUBLIC_UNIN_API_ENDPOINT}/items/claim/${tokenId}`, {
            message,
            signature
        }).then(response => {
            console.log(response.data);
            return true;
        }).catch(error => {
            console.error(error);
            return false;
        });
    },

    getItem: async (tokenId:string):Promise<Item> => {
        return axios.get(`${process.env.NEXT_PUBLIC_UNIN_API_ENDPOINT}/items/${tokenId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
    },

    getItemsForOwner: async (owner:string):Promise<Item[]> => {
        return axios.get(`${process.env.NEXT_PUBLIC_UNIN_API_ENDPOINT}/items/owner/${owner}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
    },

    registerItem: async (tokenId:string, message:string, signature: unknown, name: string, description: string) => {
        return axios.post(`${process.env.NEXT_PUBLIC_UNIN_API_ENDPOINT}/items/${tokenId}`, {
            message,
            signature,
            name,
            description
        })
            .then((response) => {
                const { message } = response.data;
                return true;
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    }
}
