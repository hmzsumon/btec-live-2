import React from 'react';
import Img1 from '../assets/images/elements/hero-shape.jpg.png';
import Img2 from '../assets/images/elements/hero-building.png';
import Img3 from '../assets/images/elements/car-shadow.png';
import Img4 from '../assets/images/elements/car-ray.png';
import Img5 from '../assets/images/elements/car-light.png';
import Img6 from '../assets/images/elements/hero-car.png';
import Img7 from '../assets/images/elements/car-star.png';

const Hero = () => {
	return (
		<div>
			{/* <!-- hero start --> */}
			<section className='-mt-28 hero'>
				<div className='hero__shape'>
					<img src={Img1} alt='image1' />
				</div>
				<div className='hero__element '>
					<img src={Img2} alt='image2' />
				</div>
				<div
					className='hero__car wow bounceIn'
					data-wow-duration='0.5s'
					data-wow-delay='1s'
				>
					<img src={Img3} alt='image3' className='car-shadow' />
					<img src={Img4} alt='image4' className='car-ray' />
					<img src={Img5} alt='image5' className='car-light' />
					<img src={Img6} alt='image6' className='hero-car' />
					<img src={Img7} alt='image7' className='car-star' />
				</div>
				<div className='px-4 md:px-20'>
					<div className='grid-cols-12 md:grid '>
						<div className='w-full md:col-span-6'>
							<div className='hero__content'>
								<div
									className='hero__subtitle wow fadeInUp'
									data-wow-duration='0.5s'
									data-wow-delay='0.3s'
								>
									Contest FOR YOUR CHANCE to
								</div>
								<h2
									className='text-white hero__title wow fadeInUp'
									data-wow-duration='0.5s'
									data-wow-delay='0.5s'
								>
									big win
								</h2>
								<p
									className='wow fadeInUp'
									data-wow-duration='0.5s'
									data-wow-delay='0.7s'
								>
									Now's your chance to win a car! Check out the prestige cars
									you can win in our car prize draws. Will you be our next lucky
									winner?
								</p>
								<div
									className='hero__btn wow fadeInUp'
									data-wow-duration='0.5s'
									data-wow-delay='0.9s'
								>
									<a href='#0' className='cmn-btn'>
										Participate Now
									</a>
									{/* <a
										className='video-btn'
										href='https://www.youtube.com/embed/d6xn5uflUjg'
										data-rel='lightcase:myCollection'
									>
										<i className='fas fa-play'></i>
									</a> */}
								</div>
							</div>
						</div>
						<div className='col-span-12 md:col-span-6'>
							<div className='hero__thumb'>
								<img src='assets/images/elements/car-main.png' alt='' />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- hero start --> */}
		</div>
	);
};

export default Hero;
