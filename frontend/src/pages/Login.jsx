import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import img from '../assets/img/bg-shape/section-title-img.png';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApi';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [login, { data, isError, isLoading, isSuccess, error }] =
		useLoginMutation();
	const { user } = data || {};

	const { user: s_user } = useSelector((state) => state.auth);

	const [user_id, setUser_id] = useState('');
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
		login({ user_id, password });
	};

	useEffect(() => {
		// if (isAuthenticated) {
		// 	navigate(`/${redirect}`);
		// }

		if (isError) {
			toast.error(error.data.message);
		}

		if (isSuccess) {
			toast.success('Login successful');
			if (user.role === 'admin' || user?.role === 'manager') {
				navigate('/admin-dashboard');
			} else {
				navigate('/my-teams', { state: { id: user?.id } });
			}
		}
	}, [isError, isSuccess, error, navigate, user, user_id]);
	return (
		<Layout>
			<div className='px-4 mt-20 mb-10 bg-wrapper'>
				<div className='mx-auto space-y-10 md:w-1/2 '>
					<div className='flex flex-col items-center space-y-2'>
						<p className='font-bold text-center text-orange-500 uppercase sub-title'>
							Sign In
						</p>
						<img src={img} alt='' className='w-56 ' />
						<h2 className='text-xs md:text-2xl font-[600 text-gray-300]'>
							Sign In to enter, if you've an account
						</h2>
					</div>
					<div className='w-full rounded bg-slate-800 '>
						<div className='px-6 py-4 bg-green-500 form-title rounded-t-md'>
							<h2 className='font-[600]'>Fill the form as well</h2>
						</div>
						<div className='p-4 '>
							<form onSubmit={handleSubmit}>
								<div className='space-y-4 '>
									<TextField
										id='phone'
										label='User ID'
										variant='outlined'
										type='text'
										fullWidth
										size='small'
										value={user_id}
										onChange={(e) => setUser_id(e.target.value)}
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
									{/* <div className='space-y-3 '>
										<p className='text-xs italic text-center md:text-sm'>
											No account yet in Lottowin24?{' '}
											<Link to='/register' className='text-orange-500'>
												Register{' '}
											</Link>{' '}
											here to signup.
										</p>
										<p className='text-xs italic text-center md:text-sm'>
											<Link to='/forgot-password' className='text-orange-500'>
												Forgot Password?
											</Link>
										</p>
									</div> */}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
