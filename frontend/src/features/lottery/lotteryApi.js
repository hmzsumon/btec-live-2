import { apiSlice } from '../api/apiSlice';

export const lotteryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getLotteries: builder.query({
			query: (limit) => `/tickets?limit=${limit}`,
			providesTags: (result) => [...(result?.lottery?.tags ?? ['Lottery'])],
		}),

		// buy ticket
		buyTicket: builder.mutation({
			query: (id) => ({
				url: `/ticket/buy/${id}`,
				method: 'POST',
				body: id,
			}),
			invalidatesTags: ['Lottery', 'Ticket', 'User', 'LuckyBoxes'],
		}),

		// my tickets
		getMyTickets: builder.query({
			query: () => `/user/tickets`,
			providesTags: (result) => [...(result?.lottery?.tags ?? ['Lottery'])],
		}),

		// get all sold tickets
		getAllSoldTickets: builder.query({
			query: () => `/sold/tickets`,
			providesTags: (result) => [...(result?.lottery?.tags ?? ['Lottery'])],
		}),

		// publish winners
		publishWinners: builder.mutation({
			query: (winners) => ({
				url: `/winners/publish`,
				method: 'POST',
				body: winners,
			}),
		}),

		// get all winners
		getAllWinners: builder.query({
			query: () => `/winners`,
			providesTags: (result) => [...(result?.lottery?.tags ?? ['Lottery'])],
		}),

		// get draw by date
		getDrawByDate: builder.query({
			query: (date) => `/raffle-draw?date=${date}`,
			providesTags: (result) => [...(result?.lottery?.tags ?? ['Lottery'])],
		}),

		// get remaining tickets
		getRemainingTickets: builder.query({
			query: () => `/remaining/tickets`,
			providesTags: (result) => [...(result?.lottery?.tags ?? ['Lottery'])],
		}),

		// get lucky boxes
		getLuckyBoxes: builder.query({
			query: () => `/lucky-boxes`,
			providesTags: ['LuckyBoxes'],
		}),

		// open lucky box
		openLuckyBox: builder.mutation({
			query: (id) => ({
				url: `/lucky-boxes/${id}`,
				method: 'POST',
			}),
			invalidatesTags: ['LuckyBoxes', 'Ticket', 'User'],
		}),

		// get active draw
		getActiveDraw: builder.query({
			query: () => `/active/draw`,
			providesTags: ['Lottery', 'Draw'],
		}),

		// get active draw for admin
		getActiveDrawForAdmin: builder.query({
			query: () => `/admin/draw`,
			providesTags: ['Lottery', 'Draw'],
		}),

		// get last draw
		getLastDraw: builder.query({
			query: () => `/last/draw`,
			providesTags: ['Lottery', 'Draw'],
		}),
	}),
});

export const {
	useGetLotteriesQuery,
	useBuyTicketMutation,
	useGetMyTicketsQuery,
	useGetAllSoldTicketsQuery,
	usePublishWinnersMutation,
	useGetAllWinnersQuery,
	useGetDrawByDateQuery,
	useGetRemainingTicketsQuery,
	useGetLuckyBoxesQuery,
	useOpenLuckyBoxMutation,
	useGetActiveDrawQuery,
	useGetActiveDrawForAdminQuery,
	useGetLastDrawQuery,
} = lotteryApi;
