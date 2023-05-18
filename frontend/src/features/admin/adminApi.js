import { apiSlice } from '../api/apiSlice';

export const adminApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Get company info
		getCompanyAdmin: builder.query({
			query: () => '/admin/company',
			providesTags: ['Company'],
		}),

		// get table info
		getTableAdmin: builder.query({
			query: () => '/tables',
			providesTags: ['Table'],
		}),

		// get salary info
		getSalaryAdmin: builder.query({
			query: () => '/salary',
			providesTags: ['Salary'],
		}),

		// get agent list
		getAgentAdmin: builder.query({
			query: () => '/admin/agents',
			providesTags: ['Agent'],
		}),

		// get family salary info by id
		getFamilySalaryAdmin: builder.query({
			query: (id) => `/family/salary/${id}`,
			providesTags: ['FamilySalary'],
		}),

		// get top 5 agent
		getTopAgentAdmin: builder.query({
			query: () => '/top5',
			providesTags: ['TopAgent'],
		}),
	}),
});

export const {
	useGetCompanyAdminQuery,
	useGetTableAdminQuery,
	useGetSalaryAdminQuery,
	useGetAgentAdminQuery,
	useGetFamilySalaryAdminQuery,
	useGetTopAgentAdminQuery,
} = adminApi;
