import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import {
	useGetLuckyBoxesQuery,
	useOpenLuckyBoxMutation,
} from '../../../features/lottery/lotteryApi';
import { FadeLoader } from 'react-spinners';
import box1 from '../../../assets/lottery/box.jpg';
import box2 from '../../../assets/lottery/box.gif';
import GoBack from '../../../global/GoBack';

import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const LuckyBoxes = () => {
	const { data, isLoading } = useGetLuckyBoxesQuery();
	const { luckyBoxes } = data || [];
	const { user } = useSelector((state) => state.auth);

	const [
		openLuckyBox,
		{ data: box, isError, isSuccess, error, isLoading: openLoading },
	] = useOpenLuckyBoxMutation();
	const { luckyBox } = box || {};

	const [open, setOpen] = React.useState(false);
	const [box2Open, setBox2Open] = React.useState(false);

	const handleClickOpen = (id) => {
		openLuckyBox(id);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (isSuccess && openLoading === false) {
			setOpen(true);
			setBox2Open(true);
		}

		if (isError) {
			toast.error(error?.data?.message);
		}
		setTimeout(() => {
			setBox2Open(false);
		}, 3000);
	}, [isSuccess, isError, error, openLoading]);
	return (
		<Layout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-[65vh]'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='flex items-center justify-center mx-1 '>
					<div className='w-full p-2 mx-auto space-y-2 rounded-lg md:w-7/12 bg-slate-800 '>
						<h1 className='text-center text-green-500'>
							You have{' '}
							<span className='text-orange-500'>{data?.luckyBoxes.length}</span>{' '}
							lucky boxes
						</h1>
						{data?.luckyBoxes.length > 0 && (
							<p className='text-xs flex flex-col space-y-2 italic text-center text-orange-500'>
								<span>
									Please click on the lucky box to open it and get your reward
								</span>
								<span className='  text-yellow-500 text-sm'>
									Reword will be 1 to 100,000 BDT
								</span>
							</p>
						)}
						{user?.is_active === false && (
							<p className='text-xs flex flex-col space-y-2 italic text-center text-orange-500'>
								<span className='text-red-500 text-xs'>
									You have to activate your account to open lucky box. Please
									recharge minimal to activate your account.
								</span>
							</p>
						)}
						{luckyBoxes.length === 0 && (
							<div className='h-[50vh] flex items-center justify-center'>
								<h1 className='text-center text-yellow-500'>
									You have no lucky boxes
								</h1>
							</div>
						)}
						<div className='flex flex-wrap items-center min-h-[20vh] justify-center gap-4 '>
							{luckyBoxes.map((box) => (
								<button
									key={box._id}
									className='flex items-center justify-center cursor-pointer disabled:cursor-not-allowed'
									onClick={() => handleClickOpen(box._id)}
									disabled={user?.is_active === false}
								>
									<img
										src={box1}
										alt='box'
										className='mx-auto rounded-lg w-14 h-14 md:w-20 md:h-20'
									/>
								</button>
							))}
						</div>
						{/* Dialog */}
						<div>
							<Dialog
								open={open}
								TransitionComponent={Transition}
								keepMounted
								onClose={handleClose}
								aria-describedby='alert-dialog-slide-description'
							>
								<DialogContent className='p-0 bg-transparent'>
									{box2Open ? (
										<div className='flex items-center justify-center cursor-pointer'>
											<img src={box2} alt='box' className='w-40 h-40 ' />
										</div>
									) : (
										<div className='flex flex-col items-center justify-evenly w-40 h-40 bg-gray-50'>
											<h2 className='text-green-500 '>
												You have won {Number(luckyBox?.lucky_amount).toFixed(2)}
												&#8354;
											</h2>
											<button className='text-red-500' onClick={handleClose}>
												Close
											</button>
										</div>
									)}
								</DialogContent>
							</Dialog>
						</div>
						{/*End Dialog */}
						<div className='flex flex-col items-center justify-center mt-6'>
							<GoBack />
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default LuckyBoxes;
