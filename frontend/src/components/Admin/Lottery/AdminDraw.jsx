import React, { useState, useEffect } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import DashboardLayout from '../layouts/DashboardLayout';
import { toast } from 'react-toastify';

import {
	useGetAllSoldTicketsQuery,
	usePublishWinnersMutation,
} from '../../../features/lottery/lotteryApi';

const AdminDraw = ({ user }) => {
	const [
		publishWinners,
		{ isLoading: publishLoading, isError, error, isSuccess },
	] = usePublishWinnersMutation();
	const { data, isLoading } = useGetAllSoldTicketsQuery();
	const { tickets, draw } = data || [];
	const { prizes } = draw || [];

	const [newTickets, setNewTickets] = useState([]);

	const [winners, setWinners] = useState([]);

	useEffect(() => {
		if (tickets) {
			const ticketsArray = Object.values(tickets);
			setNewTickets(ticketsArray);
		}
	}, [tickets]);

	// generate 10 winners with position 1st to 5th from the sold tickets
	//const winners = ticketsArray?.sort(() => 0.5 - Math.random()).slice(0, 10);

	const handleDraw = () => {
		// if (newTickets.length < 10) {
		// 	toast.error('Not enough tickets sold');
		// 	return;
		// }
		const winnersArray = [];
		const winners = newTickets.sort(() => 0.5 - Math.random()).slice(0, 1);

		for (let i = 0; i < winners.length; i++) {
			const winner = {
				user_id: winners[i].owner,
				name: winners[i].ownerName,
				phone: winners[i].phone,
				email: winners[i].email,
				ticket_no: winners[i].ticketNumber,
				position: i + 1,
			};

			if (i === 0) {
				winner.prize_amount = prizes[0].prize_amount;
				winner.prize_name = prizes[0].prize_title;
			}

			winnersArray.push(winner);
		}
		setWinners(winnersArray);
	};

	const handlePublish = () => {
		publishWinners(winners);
	};

	useEffect(() => {
		if (isError) {
			toast.error(error.data.message);
		}
		if (isSuccess) {
			toast.success('Winners published successfully');
			setWinners([]);
		}
	}, [isError, isSuccess, error]);

	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='px-2 py-4 space-y-4'>
					<h2>Draw Dashboard</h2>
					<button
						className='px-4 py-1 bg-yellow-400 rounded-sm'
						onClick={handleDraw}
					>
						Draw
					</button>
					<div className='px-10 '>
						<div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
							<table className='w-full text-sm text-left text-gray-400 '>
								<thead className='ml-4 text-xs text-gray-400 uppercase bg-gray-700'>
									<tr>
										<th className='pl-4 '>Winner Name</th>
										<th>Ticket No.</th>
										<th>Position</th>
										<th>Title</th>
										<th>Prize</th>
									</tr>
								</thead>
								<tbody>
									{winners.map((winner, i) => (
										<tr
											key={i}
											className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
										>
											<td className='pl-4'>{winner.name}</td>
											<td>{winner.ticket_no}</td>
											<td>{winner.position}</td>
											<td>{winner.prize_name}</td>
											<td>
												&#8354; {Number(winner.prize_amount).toLocaleString()}
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<button
								className='w-full px-4 py-1 bg-green-500 rounded-sm disabled:cursor-not-allowed'
								onClick={handlePublish}
								disabled={winners.length === 0}
							>
								{publishLoading ? (
									<div className='flex items-center justify-center w-full'>
										<FadeLoader color={'#fbbf24'} />
									</div>
								) : (
									'Publish'
								)}
							</button>
						</div>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default AdminDraw;
