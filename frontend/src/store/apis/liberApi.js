import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const liberApi = createApi({
    reducerPath: 'liberApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const perdorues = getState().perdorues;

            if (perdorues && perdorues.token) {
                headers.set('authorization', `Bearer ${perdorues.token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Liber'],
    endpoints: (builder) => ({
        merrLibrat: builder.query({
            query: () => '/librat',
            providesTags: ['Liber'],
        }),
        shtoLiber: builder.mutation({
            query: (libri) => ({
                url: '/librat',
                method: 'POST',
                body: libri,
            }),
            invalidatesTags: ['Liber'],
        }),
        ndryshoLiber: builder.mutation({
            query: ({ id, ...libri }) => ({
                url: `/librat/${id}`,
                method: 'PUT',
                body: libri,
            }),
            invalidatesTags: ['Liber'],
        }),
        fshiLiber: builder.mutation({
            query: (id) => ({
                url: `/librat/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Liber'],
        }),
    }),
});

export const {
    useMerrLibratQuery,
    useShtoLiberMutation,
    useNdryshoLiberMutation,
    useFshiLiberMutation,
} = liberApi;

