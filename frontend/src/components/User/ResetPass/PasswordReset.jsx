import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../Admin/layouts/DashboardLayout';
import { useResetPasswordAdminMutation } from '../../../features/admin/adminApi';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const PasswordReset = () => {
	const navigate = useNavigate();
	const { token } = useParams();

	const [resetPasswordAdmin, { isLoading, isSuccess, isError, error }] =
		useResetPasswordAdminMutation();

	// captcha
	const [user_id, setUser_id] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordShown, setPasswordShown] = useState(false);
	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};

	// form State

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			return toast.error('Password Not Matched');
		}
		const myForm = new FormData();
		myForm.append('password', password);
		myForm.append('confirmPassword', confirmPassword);
		myForm.append('user_id', user_id);
		resetPasswordAdmin(myForm);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Password Reset Successfully');
			navigate('/admin/agents');
		}
		if (isError) {
			toast.error(error.data.message);
		}
	}, [isSuccess, isError, error, navigate]);

	return (
		<ThemeProvider theme={darkTheme}>
			<DashboardLayout>
				<div className=''>
					<div className='px-4 py-20 sign-up-wrapper '>
						<Box
							className='flex flex-col gap-4 bg-slate-800 p-4 rounded-md w-[95%] md:w-7/12 mx-auto'
							noValidate
							autoComplete='off'
						>
							<h2 className='my-4 text-2xl text-center '>Reset Password</h2>

							<Box
								component='form'
								className='flex flex-col w-full gap-4 mx-auto rounded-md'
								noValidate
								autoComplete='off'
								onSubmit={handleSubmit}
							>
								<TextField
									id='name'
									type='text'
									label='Family ID'
									variant='outlined'
									fullWidth
									autoComplete='off'
									size='normal'
									value={user_id}
									onChange={(e) => setUser_id(e.target.value)}
								/>

								<TextField
									id='name'
									type={passwordShown ? 'text' : 'password'}
									label='New Password'
									variant='outlined'
									fullWidth
									autoComplete='off'
									size='normal'
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

								<TextField
									id='name'
									type={passwordShown ? 'text' : 'password'}
									label='Confirm Password'
									variant='outlined'
									fullWidth
									autoComplete='off'
									size='normal'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
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

								<button
									className='bg-[#ffeb3b] hover:bg-[#c5b104] disabled:cursor-not-allowed font-semibold text-slate-700 py-2 rounded-md'
									disabled={isLoading}
								>
									{isLoading ? <BeatLoader color='#000' size={10} /> : 'Submit'}
								</button>
							</Box>
						</Box>
					</div>
				</div>
			</DashboardLayout>
		</ThemeProvider>
	);
};

export default PasswordReset;
