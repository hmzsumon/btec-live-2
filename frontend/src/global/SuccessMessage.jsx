import React from 'react';
import SuccessImg from '../assets/success_1.gif';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const SuccessMessage = ({ message }) => {
	return (
		<div className='flex items-center justify-center mx-1 '>
			<div className='w-full md:w-7/12 mx-auto bg-slate-800 rounded-lg p-2 space-y-4 '>
				<div className=' w-6/12 mx-auto'>
					<img src={SuccessImg} alt='Success' />
				</div>
				<h1 className='text-center text-green-500'>
					<span>{message}</span>
				</h1>
				<div className='flex items-center justify-center'>
					<Link
						to='/user-dashboard'
						className='flex items-center text-xs text-blue-600 hover:underline hover:text-blue-700 '
					>
						<span>
							<BsArrowLeftShort className='text-xl ' />
						</span>
						<span>Go Back</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SuccessMessage;
