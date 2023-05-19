import React from 'react';

const TopHost = ({ host, index }) => {
	return (
		<div className='p-2 border border-blue-700 rounded-md bg-slate-700'>
			<h3 className='text-xs italic font-semibold text-center'>
				Top {index + 1} Host
			</h3>
			<div className='my-2 space-y-2 leading-tight text-gray-300 '>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						BTEC ID:
						<span className='ml-2 text-blue-500'>{host?.id}</span>
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Name: {decodeURIComponent(host?.nick_name)}
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold '>
						Total Coins:{' '}
						<span className='text-yellow-400'>
							{Number(host?.receive_coin).toLocaleString()}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default TopHost;
