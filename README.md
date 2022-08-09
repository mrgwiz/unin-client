# unin-client

This is the web client for the Universal Inventory system.

## Install Node Modules

```shell
npm install
```

## Testing Locally

Place `.env.local` file on the root.

```ini
NEXT_PUBLIC_UNIN_CONTRACT_ADDR="0x0"
NEXT_PUBLIC_UNIN_ITEM_COST_DEC="0.05"
NEXT_PUBLIC_UNIN_ITEM_COST_HEX="0xB1A2BC2EC50000"
NEXT_PUBLIC_WEB3_PROVIDER="wss://"
NEXT_PUBLIC_UNIN_API_ENDPOINT="https://"
```

Run development server.

```shell
npm run dev
```
