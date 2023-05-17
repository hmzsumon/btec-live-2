import { apiSlice } from '../api/apiSlice';

export const shareCardApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get share cards
		getShareCards: builder.query({
			query: (limit) => `/share/cards?limit=${limit}`,
			providesTags: (result) => [...(result?.shareCard?.tags ?? ['ShareCard'])],
		}),

		// buy share card
		buyShareCard: builder.mutation({
			query: (cardId) => ({
				url: `/share/card-buy/${cardId}`,
				method: 'POST',
			}),
			invalidatesTags: (result) => [
				...(result?.shareCard?.tags ?? ['ShareCard']),
			],
		}),

		// get share details
		getShareDetails: builder.query({
			query: () => `/share/card-details`,
			providesTags: (result) => [...(result?.shareCard?.tags ?? ['ShareCard'])],
		}),

		// ged admin share card details
		getAdminShareCardDetails: builder.query({
			query: () => `/admin/share-cards`,
			providesTags: (result) => [...(result?.shareCard?.tags ?? ['ShareCard'])],
		}),

		// add profit to share cards
		addProfitToShareCards: builder.mutation({
			query: (profit) => ({
				url: `/admin/share-cards/add-profit`,
				method: 'PUT',
				body: profit,
			}),
			invalidatesTags: (result) => [
				...(result?.shareCard?.tags ?? ['ShareCard']),
			],
		}),

		// get share cards by user id
		getShareCardsByUserId: builder.query({
			query: (id) => `/admin/share-cards/${id}`,
		}),
	}),
});

export const {
	useGetShareCardsQuery,
	useBuyShareCardMutation,
	useGetShareDetailsQuery,
	useGetAdminShareCardDetailsQuery,
	useAddProfitToShareCardsMutation,
	useGetShareCardsByUserIdQuery,
} = shareCardApi;
