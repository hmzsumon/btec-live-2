import React from 'react';
import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
	return (
		<div className='flex flex-col justify-between min-h-screen '>
			<Header />
			<div className='px-2 my-[5.2rem] '>{children}</div>
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;
