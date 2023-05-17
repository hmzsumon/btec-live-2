import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

import { FadeLoader } from 'react-spinners';
import { formatDate } from '../../../utils/functions';

import { Link } from 'react-router-dom';
import { BsArrowLeftSquare } from 'react-icons/bs';
import Layout from '../Layout/Layout';

import { useGetMyWithdrawsQuery } from '../../../features/withdraw/withdrawApi';

const MyWithdraws = () => {
	const { data, isLoading, isError, error } = useGetMyWithdrawsQuery();
	const { withdraws } = data || [];
	const { withdrawDetails } = data || {};

	if (!withdraws && !isLoading) {
		return (
			<Layout>
				<div className='flex flex-col items-center justify-center h-full'>
					<div className='flex flex-col items-center justify-center space-y-4'>
						<h1 className='text-2xl font-bold text-gray-100'>
							You have no any withdraw yet!
						</h1>
						<Link to='/user-dashboard'>
							<button className='px-4 py-2 text-white bg-blue-500 rounded-md'>
								<BsArrowLeftSquare className='inline-block text-xl' /> Go Back
							</button>
						</Link>
					</div>
				</div>
			</Layout>
		);
	}

	const columns = [
		{
			field: 'date',
			headerName: 'Date',
			width: 150,
		},

		{
			field: 'amount',
			headerName: 'Amount',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 100,
			renderCell: (params) => (
				<div className='flex items-center gap-2'>
					<p>&#8354; {Number(params.row.amount).toLocaleString()}</p>
				</div>
			),
		},
		{
			field: 'method',
			headerName: 'Method',
			width: 100,
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='flex items-center'>
						{params.row.status === 'pending' && (
							<p className='text-red-500'>Pending</p>
						)}
						{params.row.status === 'approved' && (
							<p className='text-green-500'>Approved</p>
						)}
						{params.row.status === 'rejected' && (
							<p className='text-red-500 '>Rejected</p>
						)}
					</div>
				);
			},
		},

		{
			field: 'update',
			headerName: 'Updated At',
			width: 150,
			renderCell: (params) => (
				<>
					{/* {console.log(params.row)} */}

					<div className=' text-[0.6rem]'>
						{params.row.status === 'rejected' && (
							<p className='text-red-500 flex flex-col'>
								<span>Rejected By Admin</span>
								<span>{params.row.reason}</span>
							</p>
						)}
						{params.row.status === 'approved' && (
							<p className='text-green-500'>Approved</p>
						)}
						{params.row.status === 'pending' && (
							<p className='text-orange-500 text-xs'>Pending</p>
						)}
					</div>
				</>
			),
		},
		{
			field: 'comment',
			headerName: 'Comment',
			width: 150,
			renderCell: (params) => (
				<div className='text-[0.5rem]'>
					<p className='text-green-500'>
						{params.row.status === 'approved' && params.row.comment}
					</p>
					<p className='text-red-500'>
						{params.row.status === 'rejected' && params.row.comment}
					</p>
					<p className='text-orange-500 text-xs'>
						{params.row.status === 'pending' && 'Pending'}
					</p>
				</div>
			),
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => (
				<div className='flex items-center justify-center gap-2'>
					<Link to={`/withdraw/${params.row.id}`}>
						<button className='px-2 py-1 text-sm text-white bg-blue-500 rounded-md'>
							Details
						</button>
					</Link>
				</div>
			),
		},
	];

	const rows = [];

	withdraws &&
		withdraws.map((deposit) => {
			return rows.unshift({
				id: deposit._id,
				name: deposit.name,
				date: formatDate(deposit.createdAt),
				method: deposit.method.name,
				status: deposit.status,
				amount: deposit.amount,
				comment: deposit.comment,
				reason: deposit.reason,
				rejectedAt: deposit.rejectedAt,
				rejectedBy: deposit.rejected_by,
				approvedAt: deposit.approvedAt,
				approvedBy: deposit.approved_by,
			});
		});

	return (
		<Layout>
			{isLoading ? (
				<div className='flex justify-center items-center mt-24 h-[80%]'>
					<FadeLoader color='#fff' />
				</div>
			) : (
				<div className='px-2 md:px-20'>
					<div className='flex space-x-4 items-center'>
						<Link to='/lottery' className='flex space-x-2 text-green-500 '>
							<span>
								<BsArrowLeftSquare className='text-2xl text-green-500' />
							</span>
							<span>Go Back</span>
						</Link>
						<h1 className='my-4 text-lg font-medium '>
							My Withdraws: {withdraws && withdraws.length}
						</h1>
					</div>
					<div
						className='w-full shadow-lg bg-slate-800 rounded-xl'
						style={{ height: 470 }}
					>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={100}
							disableSelectIconOnClick
							sx={{
								boxShadow: 0,
								border: 0,
							}}
						/>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default MyWithdraws;
