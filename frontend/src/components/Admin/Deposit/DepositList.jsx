import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import Actions from './Actions';
import { useGetAdminDepositsQuery } from '../../../features/deposit/depositApi';

const DepositList = () => {
	const { data, isLoading } = useGetAdminDepositsQuery();
	const { deposits } = data || [];

	// handle delete user
	const handleDelete = () => {
		console.log('delete');
	};

	// handle cancel withdraw
	const cancelWithdraw = () => {
		console.log('cancel');
	};

	const columns = [
		{
			field: 'date',
			headerName: 'Date',
			width: 150,
			renderCell: (params) => (
				<div className='flex text-xs items-center gap-2'>
					<p>{params.row.date}</p>
				</div>
			),
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 160,
			renderCell: (params) => (
				<div className='flex text-xs items-center gap-2'>
					<p>{params.row.name}</p>
				</div>
			),
		},

		{
			field: 'amount',
			headerName: 'Amount',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
			renderCell: (params) => (
				<div className='flex text-xs items-center gap-2'>
					<p>&#8354; {params.row.amount} </p>
				</div>
			),
		},
		{
			field: 'method',
			headerName: 'Method',
			width: 150,
			renderCell: (params) => (
				<div className='flex flex-col items-start text-[0.6rem] gap-1'>
					<p>{params.row.method.name}</p>
					<p>{params.row.method.send_account}</p>
				</div>
			),
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='flex items-center'>
						{params.row.status === 'pending' && (
							<p className='text-red-500 text-xs'>Pending</p>
						)}
						{params.row.status === 'approved' && (
							<p className='text-green-500'>
								<span>Approved</span>
								<span>{params.row.update}</span>
							</p>
						)}
						{params.row.status === 'rejected' && (
							<p className='text-orange-500 '>
								<span>Rejected</span>
							</p>
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
					{params.row.status === 'approved' && (
						<div>
							<p className='text-green-500 flex flex-col text-[0.6rem] '>
								<span>{formatDate(params.row.approvedAt)}</span>
								<span>{params.row.approvedBy}</span>
							</p>
						</div>
					)}
					{params.row.status === 'rejected' && (
						<div>
							<p className='text-red-500 flex flex-col text-[0.6rem] '>
								<span>{formatDate(params.row.rejectedAt)}</span>
								<span>{params.row.rejectedBy}</span>
							</p>
						</div>
					)}
					{params.row.status === 'pending' && (
						<div>
							<p className=' text-yellow-500 text-xs flex flex-col  '>
								No Update Yet
							</p>
						</div>
					)}
				</>
			),
		},

		{
			field: 'action',
			headerName: 'Action',
			width: 160,
			renderCell: (params) => {
				return (
					<Actions
						editRoute={'deposit'}
						deleteHandler={handleDelete}
						cancelWithdraw={cancelWithdraw}
						status={params.row.status}
						id={params.row.id}
						method={params.row.method}
					/>
				);
			},
		},
	];

	const rows = [];

	deposits &&
		deposits.map((deposit) => {
			return rows.unshift({
				id: deposit._id,
				name: deposit.name,
				date: formatDate(deposit.createdAt),
				method: deposit.method,
				status: deposit.status,
				update: deposit.updated,
				amount: deposit.amount,
				reason: deposit.reason,
				rejectedAt: deposit.rejectedAt,
				rejectedBy: deposit.rejected_by,
				approvedAt: deposit.approvedAt,
				approvedBy: deposit.approved_by,
			});
		});
	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='p-4'>
					<div className='w-full shadow-lg rounded-xl' style={{ height: 470 }}>
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
		</DashboardLayout>
	);
};

export default DepositList;
