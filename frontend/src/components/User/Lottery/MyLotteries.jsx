import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

import { FadeLoader } from 'react-spinners';
import { formatDate } from '../../../utils/functions';
import { useGetMyTicketsQuery } from '../../../features/lottery/lotteryApi';
import { Link } from 'react-router-dom';
import { BsArrowLeftSquare } from 'react-icons/bs';
import Layout from '../Layout/Layout';

const MyLotteries = () => {
	const { data, isLoading } = useGetMyTicketsQuery();
	const { tickets } = data || [];

	if (tickets?.length === 0) {
		return (
			<Layout>
				<div className='flex flex-col items-center justify-center h-full'>
					<div className='flex flex-col items-center justify-center space-y-4'>
						<h1 className='text-2xl font-bold text-gray-100'>
							You have no tickets yet
						</h1>
						<Link to='/lottery'>
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
			field: 'createdAt',
			headerName: 'Buy Date',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div>
						<span>{formatDate(params.row.buyDate)}</span>
					</div>
				);
			},
		},
		{
			field: 'ticketNumber',
			headerName: 'Ticket Number',
			headerAlign: 'center',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return <div className='mx-auto '>{params.row.ticketNumber}</div>;
			},
		},
		{
			field: 'price',
			headerName: 'Price',
			headerAlign: 'center',
			type: 'number',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto '>
						&#8354; {Number(params.row.price).toFixed(2)}
					</div>
				);
			},
		},
		{
			field: 'luckyBoxAmount',
			headerName: 'Lucky Box',
			headerAlign: 'center',
			type: 'number',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto text-green-500 '>
						&#8354; {Number(params.row.luckyBoxAmount).toFixed(2)}
					</div>
				);
			},
		},
		{
			field: 'result',
			headerName: 'Result',
			headerAlign: 'center',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => (
				<div className='mx-auto '>
					{params.row.is_winner ? (
						<span className='text-green-500'>Winner</span>
					) : params.row.is_loser ? (
						<span className='text-red-500'>Loser</span>
					) : (
						<span className='text-yellow-500'>Pending</span>
					)}
				</div>
			),
		},
		{
			field: 'nextDrawDate',
			headerName: 'Next Draw Date',
			headerAlign: 'center',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto flex text-[0.6rem] flex-col'>
						<span>{formatDate(params.row.nextDrawDate)}</span>
						<span>{params.row.nextDrawTime}</span>
					</div>
				);
			},
		},
	];

	const rows = [];

	tickets &&
		tickets.forEach((ticket) => {
			rows.unshift({
				id: ticket._id,
				buyDate: ticket.buyDate,
				ticketNumber: ticket.ticketNumber,
				price: ticket.price,
				status: ticket.status,
				nextDrawDate: ticket.next_draw_date,
				nextDrawTime: ticket.next_draw_time,
				is_winner: ticket.is_winner,
				is_loser: ticket.is_loser,
				luckyBoxAmount: ticket.lucky_box_amount,
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
							My Tickets: {tickets && tickets.length}
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

export default MyLotteries;
