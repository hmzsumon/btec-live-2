import React, { useEffect, useState } from 'react';

import Hero from './Hero';
import HowToPlay from './HowToPlay';
import Contest from './Contest';
import LatestWinners from './LatestWinners';
import Overview from './Overview';
import Support from './Support';
import Layout from '../layouts/Layout';
import ScrollToTop from '../global/ScrollToTop';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Imge1 from '../assets/banner/eid_banar.jpg';

const Home = () => {
	//==================Start Dialog Section =================
	const [open, setOpen] = useState(true);
	const handleClose = () => {
		setOpen(false);
		localStorage.setItem('isActiveNotice', false);
	};
	const [isActiveNotice, setIsActiveNotice] = useState(true);

	useEffect(() => {
		setIsActiveNotice(localStorage.getItem('isActiveNotice'));
		if (isActiveNotice === 'true') {
			setOpen(true);
		}
	}, [isActiveNotice]);
	return (
		<Layout>
			<ScrollToTop />
			<Hero />
			<HowToPlay />
			<Contest />
			<LatestWinners />
			<Overview />
			<Support />
			{/* Dialog section */}

			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogContent sx={{ backgroundColor: '#7D1263' }}>
						<DialogContentText id='alert-dialog-description'>
							<h2 className=' text-[1rem]  font-bold  text-yellow-500 text-center '>
								Welcome To Our Lotto Win 24
							</h2>
							<div className='my-6'>
								<img src={Imge1} alt='Banner' className=' w-96' />
							</div>
						</DialogContentText>
						<hr className='my-2' />
					</DialogContent>
					<DialogActions>
						<Button sx={{ padding: '5px' }} onClick={handleClose}>
							<span className='text-red-500 '>Close</span>
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</Layout>
	);
};

export default Home;
