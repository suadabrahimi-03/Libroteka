import { createSlice } from '@reduxjs/toolkit';

const perdoruesNgaStorage = JSON.parse(localStorage.getItem('perdorues'));

const perdoruesSlice = createSlice({
    name: 'perdorues',
    initialState: perdoruesNgaStorage ? perdoruesNgaStorage : null,
    reducers: {
        vendosPerdorues: (state, action) => {
            localStorage.setItem('perdorues', JSON.stringify(action.payload));
            return action.payload;
        },
        dilPerdorues: () => {
            localStorage.removeItem('perdorues');
            return null;
        },
    },
});

export const { vendosPerdorues, dilPerdorues } = perdoruesSlice.actions;
export default perdoruesSlice.reducer;
