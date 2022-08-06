import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from './reducers/messages'
import web3Reducer from './reducers/web3'

export const store = configureStore({
    reducer: {
        messages: messagesReducer,
        web3: web3Reducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
