import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import Moment from 'react-moment';
import { useGetUserTnxByIdQuery } from '../../../features/tnx/tnxApi';
import { FadeLoader } from 'react-spinners';
import GoBack from '../../../global/GoBack';
import DashboardLayout from '../layouts/DashboardLayout';
import { useLocation } from 'react-router-dom';

const UserTransactions = () => {
	const location = useLocation();
	const id = location.state;
	console.log(id);
	const { data, isLoading } = useGetUserTnxByIdQuery(id);
	const { transactions } = data || [];

	const columns = [
		{
			field: 'createdAt',
			headerName: 'Date & Time',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div>
						<Moment format='DD/MM/YYYY hh:mm a'>{params.row.createdAt}</Moment>
					</div>
				);
			},
		},
		{
			field: 'transactionType',
			headerName: 'Tnx Type',
			headerAlign: 'center',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto'>
						<span className='text-green-500 '>
							{params.row.transactionType === 'cashIn' && 'Cash In'}
						</span>
						<span className='text-center text-red-500 '>
							{params.row.transactionType === 'cashOut' && 'Cash Out'}
						</span>
					</div>
				);
			},
		},
		{
			field: 'amount',
			headerName: 'Amount',
			headerAlign: 'center',
			type: 'number',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto '>
						{params.row.transactionType === 'cashIn' && (
							<span className='flex items-center text-green-500 '>
								+ {params.row.amount.toLocaleString()} &#8354;
							</span>
						)}

						{params.row.transactionType === 'cashOut' && (
							<span className='flex items-center text-red-500 '>
								- {params.row.amount.toLocaleString()} &#8354;
							</span>
						)}
					</div>
				);
			},
		},
		{
			field: 'purpose',
			headerName: 'Purpose',
			headerAlign: 'center',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto'>
						<span className=' text-gray-100 text-[0.5rem] capitalize'>
							{params.row.purpose}
						</span>
					</div>
				);
			},
		},
		{
			field: 'description',
			headerName: 'Description',
			headerAlign: 'center',
			minWidth: 200,
			flex: 1,
			renderCell: (params) => {
				return (
					<span className=' ml-5 text-[0.5rem] md:text-xs '>
						{params.row.description}
					</span>
				);
			},
		},
	];

	const rows = [];

	transactions &&
		transactions.forEach((tnx) => {
			rows.unshift({
				id: tnx._id,
				amount: tnx.amount,
				transactionType: tnx.transactionType,
				createdAt: tnx.createdAt,
				description: tnx.description,
				purpose: tnx.purpose,
			});
		});

	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex justify-center items-center mt-24 h-[80%]'>
					<FadeLoader color='#fff' />
				</div>
			) : (
				<div className='px-2 text-xs md:px-20'>
					<div className='flex items-center space-x-4 '>
						<GoBack />
						<h1 className='my-4 text-sm font-medium uppercase'>
							transactions: {transactions && transactions.length}
						</h1>
					</div>
					<div>
						<p className=''>
							Total Cash In :{' '}
							<span className='text-green-500 '>
								{transactions &&
									transactions
										.filter((tnx) => tnx.transactionType === 'cashIn')
										.reduce((acc, tnx) => acc + tnx.amount, 0)
										.toLocaleString()}{' '}
								&#8354;
							</span>
						</p>
						<p>
							Total Cash Out :{' '}
							<span className='text-red-500 '>
								{transactions &&
									transactions
										.filter((tnx) => tnx.transactionType === 'cashOut')
										.reduce((acc, tnx) => acc + tnx.amount, 0)
										.toLocaleString()}{' '}
								&#8354;
							</span>
						</p>
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
		</DashboardLayout>
	);
};

export default UserTransactions;
