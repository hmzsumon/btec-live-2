import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';
import ExcelJS from 'exceljs';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

// import Actions from './Actions';
import { useParams } from 'react-router-dom';

import { useGetFamilySalaryAdminQuery } from '../../../features/admin/adminApi';
// import { Link } from 'react-router-dom';
// import { FiEye } from 'react-icons/fi';

const FamilySalary = () => {
	const { id } = useParams();
	const { data, isLoading, isError, isSuccess, error } =
		useGetFamilySalaryAdminQuery(id);
	const {
		users,
		singleFamily,
		totalMerchantPay,
		totalCoins,
		totalGrossSalary,
		totalHost,
	} = data || [];

	// // handle delete user
	// const handleDelete = () => {
	// 	console.log('delete');
	// };

	// // handle cancel withdraw
	// const cancelWithdraw = () => {
	// 	console.log('cancel');
	// };

	const columns = [
		// {
		// 	field: 'join_date',
		// 	headerName: 'Join Date',
		// 	width: 150,
		// },
		{
			field: 'name',
			headerName: 'Name',
			width: 160,
			renderCell: (params) => {
				return (
					<div className='flex items-center'>
						{decodeURIComponent(params.row.name)}
					</div>
				);
			},
		},

		{
			field: 'id',
			headerName: 'Bteclive ID',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
		},
		{
			field: 'coin',
			headerName: 'Received Coin',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.9rem]'>
						<p className='text-yellow-400'>
							{Number(params.row.coin).toLocaleString('en-US')}
						</p>
					</div>
				);
			},
		},
		{
			field: 'base_pay',
			headerName: 'Base Pay',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-purple-600'>
							{Number(params.row.base_pay).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'day_bonus',
			headerName: 'Day Bonus',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-blue-500'>
							{Number(params.row.day_bonus).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'extra_bonus',
			headerName: 'Extra Bonus',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-orange-500'>
							{Number(params.row.extra_bonus).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'grosSalary',
			headerName: 'Host Salary',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-green-500'>
							{Number(params.row.grosSalary).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'merchant_pay',
			headerName: 'Merchant Pay',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-orange-300'>
							{Number(
								Number(params.row.merchant_pay) +
									Number(params.row.merchant_extra)
							).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'total_pay',
			headerName: 'Total Pay',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-yellow-500 '>
							{Number(params.row.total_pay).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},

		// {
		// 	field: 'balance',
		// 	headerName: 'Balance',
		// 	width: 150,
		// 	renderCell: (params) => {
		// 		console.log(params.row.balance);
		// 		return (
		// 			<div className='text-[0.5rem]'>
		// 				<p className='text-orange-500'>
		// 					M: {params.row.balance.m} &#8354;
		// 				</p>
		// 				<p className='text-green-500'>
		// 					W: {params.row.balance.b} &#8354;
		// 				</p>
		// 				<p className='text-blue-500'>B: {params.row.balance.w} &#8354;</p>
		// 			</div>
		// 		);
		// 	},
		// },

		// {
		// 	field: 'action',
		// 	headerName: 'Action',
		// 	width: 160,
		// 	renderCell: (params) => {
		// 		return (
		// 			<Actions
		// 				editRoute={'user'}
		// 				deleteHandler={handleDelete}
		// 				cancelWithdraw={cancelWithdraw}
		// 				status={params.row.status}
		// 				id={params.row.id}
		// 				method={params.row.method}
		// 			/>
		// 		);
		// 	},
		// },
	];

	const rows = [];

	users &&
		users.map((user) => {
			return rows.unshift({
				id: user.id,
				name: user.nickname,
				coin: user.coin,
				salary_amount: user.salary_amount,
				base_pay: user.base_pay,
				merchant_pay: user.merchant_pay,
				grosSalary: user.grosSalary,
				day_bonus: user.day_bonus,
				extra: user.extra,
				extra_bonus: user.extra_bonus,
				merchant_extra: user.merchant_extra,
				merchant_total: user.merchant_total,
				total_pay:
					Number(user.grosSalary) +
					Number(user.merchant_pay) +
					Number(user.merchant_extra),
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
					<div className='my-3 space-y-2 '>
						<p className='space-x-2 '>
							<span className='text-green-500'>Family Name: </span>
							<span>{singleFamily && singleFamily.name}</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Family ID: </span>
							<span>{singleFamily && singleFamily.user_id}</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Family Total Coin: </span>
							<span>
								{Number(totalCoins && totalCoins).toLocaleString('en-US')}
							</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Total Host Salary: </span>
							<span>
								{Number(totalGrossSalary).toLocaleString('en-US', {
									style: 'currency',
									currency: 'bdt',
								})}
							</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Agent Salary: </span>
							<span>
								{Number(totalMerchantPay && totalMerchantPay).toLocaleString(
									'en-US',
									{ style: 'currency', currency: 'bdt' }
								)}
							</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Total Salary: </span>
							<span>
								{totalGrossSalary &&
									Number(
										Number(totalGrossSalary) + Number(totalMerchantPay)
									).toLocaleString('en-US', {
										style: 'currency',
										currency: 'bdt',
									})}
							</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Total Host: </span>
							<span>{totalHost && totalHost}</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Total Success Host: </span>
							<span>{users && users.length}</span>
						</p>
					</div>

					<div className='w-full shadow-lg rounded-xl' style={{ height: 470 }}>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={100}
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

export default FamilySalary;
