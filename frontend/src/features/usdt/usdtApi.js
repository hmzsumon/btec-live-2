import { apiSlice } from '../api/apiSlice';

export const usdtApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// convert usdt to pxc
		convertUsdtToPxc: builder.mutation({
			query: () => ({
				url: '/convert-usdt-to-pxc',
				method: 'PUT',
				invalidateTags: ['Users', 'User'],
			}),
		}),
	}),
});

export const { useConvertUsdtToPxcMutation } = usdtApi;
