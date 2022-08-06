import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type MessageType =  "info" | "warning" | "success" | "error" | "loading";

type Message = {
    type: MessageType;
    message: string;
}

export interface MessagesState {
    messages: Message[];
}

export const initialState: MessagesState = {
    messages: [],
};

export const messagesState = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<{ type: MessageType, message: string }>) => {
            const { type, message } = action.payload;
            state.messages.push({ type, message });
        },

        removeMesssage: (state, action: PayloadAction<number>) => {
            var messages = state.messages;
            messages.splice(action.payload, 1);
            state.messages = messages;
        }
    }
});

export const { addMessage, removeMesssage } = messagesState.actions;

export default messagesState.reducer;
