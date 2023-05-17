import { apiSlice } from '../api/apiSlice';

export const tnxApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all tnx
		getAllTnx: builder.query({
			query: () => '/my/transactions',
			providesTags: ['Tnx'],
		}),

		// get user transactions by id
		getUserTnxById: builder.query({
			query: (id) => `/user/transactions?user_id=${id}`,
			providesTags: ['Tnx'],
		}),
	}),
});

export const { useGetAllTnxQuery, useGetUserTnxByIdQuery } = tnxApi;
