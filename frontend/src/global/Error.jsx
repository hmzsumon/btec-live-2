import React from 'react';

const Error = ({ message }) => {
	return (
		<div>
			<h1 className='text-red-500'>{message}</h1>
		</div>
	);
};

export default Error;
