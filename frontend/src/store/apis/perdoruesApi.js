import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const perdoruesApi = createApi({
    reducerPath: 'perdoruesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({
        regjistrohu: builder.mutation({
            query: (teDhenat) => ({
                url: '/perdoruesit',
                method: 'POST',
                body: teDhenat,
            }),
        }),
        hyr: builder.mutation({
            query: (teDhenat) => ({
                url: '/perdoruesit/hyr',
                method: 'POST',
                body: teDhenat,
            }),
        }),
    }),
});

export const { useRegjistrohuMutation, useHyrMutation } = perdoruesApi;
