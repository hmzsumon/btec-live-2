import React from 'react';
import Img1 from '../assets/images/elements/play-el.png';
import BgImg1 from '../assets/images/elements/card-bg-1.jpg';
import BgImg2 from '../assets/images/elements/card-bg-2.jpg';
import BgImg3 from '../assets/images/elements/card-bg-3.jpg';
import Icon1 from '../assets/images/icon/play/1.png';
import Icon2 from '../assets/images/icon/play/2.png';
import Icon3 from '../assets/images/icon/play/3.png';

const HowToPlay = () => {
	return (
		<div>
			<section className=' py-20 overflow-hidden relative'>
				<div
					className='play-elements wow bounceIn  '
					data-wow-duration='0.5s'
					data-wow-delay='0.7s'
				>
					<img src={Img1} alt='image1' className='right-0 ml-auto z-10 ' />
				</div>
				<div className='px-4 md:px-20'>
					<div className='grid grid-cols-12'>
						<div
							className='col-span-12 md:col-span-6  text-center sm:text-left wow fadeInUp'
							data-wow-duration='0.5s'
							data-wow-delay='0.3s'
						>
							<div className='section-header '>
								<span className='section-sub-title'>Need to know about</span>
								<h2 className='section-title'>How To Play</h2>
								<p>Follow these 3 easy steps!</p>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-4  gap-4'>
						<div>
							<div
								className='play-card bg_img'
								style={{ backgroundImage: `url(${BgImg1})` }}
							>
								<div className='play-card__icon flex items-center justify-center'>
									<img src={Icon1} alt='icon1' />
									<span className='play-card__number'>01</span>
								</div>
								<div className='play-card__content'>
									<h3 className='play-card__title'>Choose</h3>
									<p>Register to 1xLuck24 & Choose your contest</p>
								</div>
							</div>
							{/* <!-- play-card end --> */}
						</div>
						<div>
							<div
								className='play-card bg_img'
								style={{ backgroundImage: `url(${BgImg2})` }}
							>
								<div className='play-card__icon flex items-center justify-center'>
									<img src={Icon2} alt='icon2' />
									<span className='play-card__number'>02</span>
								</div>
								<div className='play-card__content'>
									<h3 className='play-card__title '>buy</h3>
									<p>Pick Your Numbers & Complete your Purchase</p>
								</div>
							</div>
							{/* <!-- play-card end --> */}
						</div>
						<div>
							<div
								className='play-card bg_img z-50'
								style={{ backgroundImage: `url(${BgImg3})` }}
							>
								<div className='play-card__icon flex items-center justify-center '>
									<img src={Icon3} alt='icon3' />
									<span className='play-card__number'>03</span>
								</div>
								<div className='play-card__content'>
									<h3 className='play-card__title'>Win</h3>
									<p>Start Dreaming, you're almost there</p>
								</div>
							</div>
							{/* <!-- play-card end --> */}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HowToPlay;
