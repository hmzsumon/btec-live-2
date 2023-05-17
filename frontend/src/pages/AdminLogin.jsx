import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import img from '../assets/img/bg-shape/section-title-img.png';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminLoginMutation } from '../features/auth/authApi';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AdminLogin = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [adminLogin, { data, isError, isLoading, isSuccess, error }] =
		useAdminLoginMutation();
	const { user } = data || {};

	const { isAuthenticated } = useSelector((state) => state.auth);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordShown, setPasswordShown] = useState(false);
	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		adminLogin({ email, password });
	};

	const redirect = location.search
		? location.search.split('=')[1]
		: 'admin-dashboard';

	useEffect(() => {
		// if (isAuthenticated) {
		// 	navigate(`/${redirect}`);
		// }
		if (isError) {
			toast.error(error.data.message);
		}
		if (isSuccess) {
			toast.success('Login successful');
			if (user.role === 'admin') {
				navigate('/admin-dashboard');
			} else {
				navigate('/not-access');
			}
		}
	}, [isError, isSuccess, error, navigate, user, isAuthenticated, redirect]);
	return (
		<Layout>
			<div className='px-4 mb-10 bg-wrapper'>
				<div className='mx-auto space-y-10 md:w-1/2 '>
					<div className='flex flex-col items-center space-y-2'>
						<p className='font-bold text-center text-orange-500 uppercase sub-title'>
							Admin Login
						</p>
						<img src={img} alt='' className='w-56 ' />
						<h2 className='text-xs md:text-2xl font-[600 text-gray-300]'>
							Welcome back, please login to your admin account
						</h2>
					</div>
					<div className='w-full rounded bg-slate-800 '>
						<div className='px-6 py-4 bg-green-500 form-title rounded-t-md'>
							<h2 className='font-[600]'>Login to your account</h2>
						</div>
						<div className='p-4 '>
							<form onSubmit={handleSubmit}>
								<div className='space-y-4 '>
									<TextField
										id='phone'
										label='Phone Number'
										variant='outlined'
										type='text'
										fullWidth
										size='small'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<TextField
										id='password'
										label='Password'
										variant='outlined'
										type={passwordShown ? 'text' : 'password'}
										fullWidth
										size='small'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={togglePassword}
														edge='end'
													>
														{passwordShown ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</div>

								<div className='space-y-4 '>
									<button className='w-full py-2 mt-4 font-bold text-white bg-green-500 rounded-md'>
										{isLoading ? (
											<BeatLoader
												color='#fff'
												size={10}
												speedMultiplier={0.7}
											/>
										) : (
											'Login'
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AdminLogin;
