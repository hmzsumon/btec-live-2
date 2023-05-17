import { Link } from 'react-router-dom';
import notFound from '../assets/not-access.svg';

const NotAccess = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-4 mt-16 bg-slate-900'>
			<div className='w-11/12'>
				<img
					draggable='false'
					className='h-full mx-auto sm:w-1/3 md:w-60'
					src={notFound}
					alt='Page Not Found'
				/>
				<h1 className='my-2 text-center text-red-600'>
					You don't have access to this page
				</h1>
			</div>
			<Link
				to='/'
				className='px-4 py-2 text-white uppercase bg-blue-500 rounded-sm shadow hover:shadow-lg'
			>
				Back To Home
			</Link>
		</div>
	);
};

export default NotAccess;
