import React from 'react';
import { formatDate } from '../../../utils/functions';

const ApproveDetails = ({ withdraw }) => {
	const { approved_at, approved_method } = withdraw || {};
	const { name, number, tnx_id } = approved_method || {};
	return (
		<div className='my-4 text-xs'>
			<h2 className='my-2 text-sm italic text-center text-green-500 '>
				Approved Info
			</h2>
			<div className='px-3 py-2 space-y-1 border'>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Paid at</span>
						<span>:</span>
					</li>
					<li>{formatDate(approved_at)}</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Paid by</span>
						<span>:</span>
					</li>
					<li>{name}</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>{name} number</span>
						<span>:</span>
					</li>
					<li>{number}</li>
				</div>

				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>{name} Tnx ID </span>
						<span>:</span>
					</li>
					<li>{tnx_id}</li>
				</div>
			</div>
		</div>
	);
};

export default ApproveDetails;
