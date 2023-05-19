import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import ExcelJS from 'exceljs';

import { FadeLoader } from 'react-spinners';
import { formatDate } from '../../../utils/functions';

import { Link, useLocation } from 'react-router-dom';
import { BsArrowLeftSquare } from 'react-icons/bs';
import Layout from '../Layout/Layout';

import { useGetFamilySalaryAdminQuery } from '../../../features/admin/adminApi';

const MyTeams = () => {
	const location = useLocation();
	const { id } = location.state;
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

	//handle excel export
	const handleExcelExport = () => {
		const workbook = new ExcelJS.Workbook();
		const sheet = workbook.addWorksheet('Family Salary');
		sheet.properties.defaultRowHeight = 30;
		// style header
		const headerRow = sheet.getRow(1);
		headerRow.font = { size: 12, bold: true };
		headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
		headerRow.height = 30;
		headerRow.eachCell((cell) => {
			cell.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'FFA500' },
			};
		});
		headerRow.border = {
			top: { style: 'thin' },
			left: { style: 'thin' },
			bottom: { style: 'thin' },
			right: { style: 'thin' },
		};
		headerRow.fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FFA500' },
		};

		sheet.columns = [
			{ header: 'Name', key: 'name', width: 30 },
			{ header: 'Bteclive ID', key: 'id', width: 20 },
			{ header: 'Received Coin', key: 'coin', width: 20 },
			{ header: 'Base Pay', key: 'base_pay', width: 20 },
			{ header: 'Day Bonus', key: 'day_bonus', width: 20 },
			{ header: 'Extra Bonus', key: 'extra_bonus', width: 20 },
			{ header: 'Salary', key: 'salary', width: 20 },
		];

		const rows = users?.map((user) => {
			console.log(user);
			return {
				name: decodeURIComponent(user.nickname),
				id: user.id,
				coin: user.coin,
				base_pay: user.base_pay,
				day_bonus: user.day_bonus,
				extra_bonus: user.extra_bonus,
				salary: user.grosSalary,
			};
		});

		sheet.addRows(rows);

		workbook.xlsx.writeBuffer().then((data) => {
			const blob = new Blob([data], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			});
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.setAttribute('hidden', '');
			a.setAttribute('href', url);
			a.setAttribute('download', 'host-salary.xlsx');
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		});
	};
	//application / vnd.ms - excel;
	if (users?.length === 0) {
		return (
			<Layout>
				<div className='flex flex-col items-center justify-center h-full'>
					<div className='flex flex-col items-center justify-center space-y-4'>
						<h1 className='text-2xl font-bold text-gray-100'>
							You have not joined any team yet!
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
			field: 'name',
			headerName: 'Name',
			width: 150,
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
			width: 150,
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
		<Layout>
			{isLoading ? (
				<div className='flex justify-center items-center mt-24 h-[80%]'>
					<FadeLoader color='#fff' />
				</div>
			) : (
				<div className='px-2 md:px-20'>
					<div className='flex items-center justify-between '>
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
						<div className=''>
							<button
								className='px-4 py-1 bg-orange-500 rounded'
								onClick={handleExcelExport}
							>
								Export to Excel
							</button>
						</div>
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

export default MyTeams;
