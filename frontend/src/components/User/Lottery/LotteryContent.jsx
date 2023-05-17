import React from 'react';
// import Ticket from './Ticket';
import NewTicket from './NewTicket';

const LotteryContent = ({ tickets }) => {
	return (
		<div className='grid w-full grid-cols-12 gap-8  mx-auto mb-10'>
			{tickets.map((ticket, i) => {
				return <NewTicket key={i} ticket={ticket} />;
			})}
		</div>
	);
};

export default LotteryContent;
