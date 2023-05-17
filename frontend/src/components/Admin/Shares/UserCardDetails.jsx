import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import { useParams } from 'react-router-dom';
import { useGetShareCardsByUserIdQuery } from '../../../features/shareCard/shareCardApi';
import CardDetails from '../../User/MyShareCard/CardDetails';

const UserCardDetails = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetShareCardsByUserIdQuery(id);
	const { shareCardDetails, shareCards } = data || {};

	const columns = [
		{
			field: 'buy_date',
			headerName: 'Buy Date',
			width: 150,
		},
		{
			field: 'expire_date',
			headerName: 'Expire Date',
			width: 160,
		},

		{
			field: 'total_profit',
			headerName: 'Total Profit',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
			renderCell: (params) => (
				<div className='flex items-center gap-2'>
					<p>{params.row.total_profit}</p>
				</div>
			),
		},
		{
			field: 'card_no',
			headerName: 'Card No',
			width: 150,
			renderCell: (params) => (
				<div className='text-xs'>
					<p>{params.row.card_no}</p>
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
						{!params.row.status && <p className='text-red-500'>Inactive</p>}
						{params.row.status && (
							<p className='text-green-500'>
								<span>Active</span>
							</p>
						)}
					</div>
				);
			},
		},
	];

	const rows = [];

	shareCards &&
		shareCards.map((card) => {
			return rows.unshift({
				id: card._id,
				name: card.name,
				total_profit: Number(card.total_profit).toFixed(2),
				card_no: card.card_no,
				emailVerified: card.email_verified,
				buy_date: formatDate(card.buy_date),
				expire_date: formatDate(card.expire_date),
				balance: card.balance,
				role: card.role,
				status: card.is_active,
				cards_qty: card.share_card_qty,
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
					<div>
						<CardDetails shareCardDetails={shareCardDetails} />
					</div>

					<div>
						<h1 className='text-xl font-semibold'>
							Share Cards: {shareCards && shareCards.length}
						</h1>
					</div>
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

export default UserCardDetails;
