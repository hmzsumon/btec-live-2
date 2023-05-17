import React, { useEffect, useState } from 'react';

const Countdown = ({ drawDate }) => {
	const [timerDays, setTimerDays] = useState(10);
	const [timerHours, setTimerHours] = useState(10);
	const [timerMinutes, setTimerMinutes] = useState(10);
	const [timerSeconds, setTimerSeconds] = useState(10);

	let interval;

	const startTimer = () => {
		// const countdownDate = new Date('February 5, 2023 00:00:00').getTime();
		const countdownDate = new Date(drawDate).getTime();

		interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = countdownDate - now;

			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			if (distance < 0) {
				// stop timer
				clearInterval(interval.current);
			} else {
				// update timer
				setTimerDays(days);
				setTimerHours(hours);
				setTimerMinutes(minutes);
				setTimerSeconds(seconds);
			}
		}, 1000);
	};

	// componentDidMount
	useEffect(() => {
		startTimer();
		return () => {
			clearInterval(interval);
		};
	});

	return (
		<>
			<section className=' flex items-center justify-center gap-4 my-2  '>
				<div>
					<h1 className='text-center '>Remaining Time:</h1>
				</div>
				<div className='flex space-x-1 text-[#06f1f6]'>
					<section className='text-center flex flex-col'>
						<span>{timerDays}</span>
						<small className='text-[0.5rem] -mt-2'>Days</small>
					</section>

					<span>:</span>

					<section className='text-center flex flex-col'>
						<span>{timerHours}</span>
						<small className='text-[0.5rem] -mt-2 italic'>Hours</small>
					</section>

					<span>:</span>

					<section className='text-center flex flex-col'>
						<span>{timerMinutes}</span>
						<small className='text-[0.5rem] -mt-2 italic'>Minutes</small>
					</section>

					<span>:</span>

					<section className='text-center flex flex-col'>
						<span>{timerSeconds}</span>
						<small className='text-[0.5rem] -mt-2 italic'>Seconds</small>
					</section>
				</div>
			</section>
		</>
	);
};
Countdown.defaultProps = {
	timerDays: 10,
	timerHours: 10,
	timerMinutes: 10,
	timerSeconds: 10,
};

export default Countdown;
