import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';
import { useGetMyDepositsQuery } from '../../../features/deposit/depositApi';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';

const MyDeposits = () => {
	const { data, isLoading } = useGetMyDepositsQuery();
	const { deposits } = data || [];

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
					<Link to={`/deposit/${params.row.id}`}>
						<button className='px-2 py-1 text-sm text-white bg-blue-500 rounded-md'>
							Details
						</button>
					</Link>
				</div>
			),
		},
	];

	const rows = [];

	deposits &&
		deposits.map((deposit) => {
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
				<div className='flex items-center justify-center w-full h-[65vh]'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='px-1 md:p-4'>
					<div
						className='w-full shadow-lg rounded-xl text-xs data-table '
						style={{ height: 470 }}
					>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={20}
							rowsPerPageOptions={[20]}
							checkboxSelection={false}
							onSelectionModelChange={(id) => {}}
						/>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default MyDeposits;
