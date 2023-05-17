import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { FadeLoader } from 'react-spinners';
import { formatDate } from '../../../utils/functions';
import { useGetLastDrawQuery } from '../../../features/lottery/lotteryApi';
import { Link } from 'react-router-dom';
import { BsArrowLeftSquare } from 'react-icons/bs';
import Layout from '../Layout/Layout';
import GoBack from '../../../global/GoBack';

const Draws = () => {
	const { data, isLoading } = useGetLastDrawQuery();
	const { draw } = data || {};

	if (!draw && !isLoading) {
		return (
			<Layout>
				<div className='flex flex-col justify-center items-center h-full'>
					<h1 className=' text-yellow-500'>
						Draw not available yet. Please check back later!
					</h1>
					<div className='flex flex-col my-2 items-center justify-center'>
						<GoBack />
					</div>
				</div>
			</Layout>
		);
	}

	const columns = [
		{
			field: 'name',
			headerName: 'Name',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div>
						<span>{params.row.name}</span>
					</div>
				);
			},
		},
		{
			field: 'phone',
			headerName: 'Phone',
			headerAlign: 'center',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return <div className='mx-auto '>{params.row.phone}</div>;
			},
		},
		{
			field: 'ticketNumber',
			headerName: 'Ticket No',
			headerAlign: 'center',
			type: 'number',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto '>
						<span>{params.row.ticketNumber}</span>
					</div>
				);
			},
		},
		{
			field: 'prize',
			headerName: 'Result',
			headerAlign: 'center',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => (
				<div className='mx-auto '>
					<span>{params.row.prize}</span>
				</div>
			),
		},
		{
			field: 'prizeAmount',
			headerName: 'Prize Amount',
			headerAlign: 'center',
			type: 'number',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto text-green-500 '>
						&#8354; {Number(params.row.prizeAmount).toLocaleString()}
					</div>
				);
			},
		},

		{
			field: 'drawDate',
			headerName: 'Draw Date',
			headerAlign: 'center',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div className='mx-auto flex text-[0.6rem] flex-col'>
						<span>{formatDate(draw.draw_date)}</span>
						<span>{draw?.draw_time}</span>
					</div>
				);
			},
		},
	];

	const rows = [];

	draw &&
		draw.winners.forEach((winner) => {
			rows.push({
				id: winner._id,
				name: winner.name,
				phone: winner.phone,
				ticketNumber: winner.ticket_no,
				prizeAmount: winner.prize_amount,
				prize: winner.prize_name,
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
					<div className='grid items-center my-4 grid-cols-12'>
						<div className=' col-span-1'>
							<Link
								to='/lottery'
								className='flex text-xs items-center gap-1  text-blue-500 '
							>
								<span>
									<BsArrowLeftSquare />
								</span>
							</Link>
						</div>
						<div className='col-span-11'>
							<h1 className='my-1 text-center text-green-500 text-lg font-medium '>
								{draw?.title} - Winners List
							</h1>
							<p className='text-center text-xs italic text-orange-500'>
								Draw No. <span>000{draw?.draw_no} </span>
								Date:{' '}
								<span>
									{formatDate(draw?.draw_date)} {draw?.draw_time}
								</span>
							</p>
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

export default Draws;
