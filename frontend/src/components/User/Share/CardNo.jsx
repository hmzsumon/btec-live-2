import React from 'react';

const CardNo = ({ cardNo }) => {
	let spaceNo = cardNo?.replace(/(.{4})/g, '$1 ');
	return (
		<div>
			<h1 className='text-xl font-bold outline-card '>{spaceNo}</h1>
		</div>
	);
};

export default CardNo;
