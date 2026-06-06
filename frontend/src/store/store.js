import { configureStore } from '@reduxjs/toolkit';
import perdoruesReducer from './slices/perdoruesSlice';
import { perdoruesApi } from './apis/perdoruesApi';
import { liberApi } from './apis/liberApi';

export const store = configureStore({
    reducer: {
        perdorues: perdoruesReducer,
        [perdoruesApi.reducerPath]: perdoruesApi.reducer,
        [liberApi.reducerPath]: liberApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(perdoruesApi.middleware)
            .concat(liberApi.middleware),
});