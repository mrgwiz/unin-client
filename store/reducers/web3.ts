import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Web3State {
    selectedAddress: string
}

const initialState: Web3State = {
    selectedAddress: ''
}

export const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        setSelectedAddress: (state, action: PayloadAction<string>) => {
            state.selectedAddress = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setSelectedAddress } = web3Slice.actions;

export default web3Slice.reducer;
