import React from 'react';
import Layout from '../Layout/Layout';
import Menu from '../Dashboard/Menu';
import { useSelector } from 'react-redux';
import ShareCardMenu from './ShareCardMenu';
const More = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<Layout>
			<div className='space-y-2 '>
				<Menu />
				{user?.is_share_card && <ShareCardMenu />}
			</div>
		</Layout>
	);
};

export default More;
