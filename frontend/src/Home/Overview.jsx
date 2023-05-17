import React from 'react';
import MapImg from '../assets/images/elements/map.png';
import OverImg1 from '../assets/images/elements/overview-obj-1.png';
import OverImg2 from '../assets/images/elements/overview-obj-2.png';
import OverImg3 from '../assets/images/elements/overview-obj-3.png';
import OverImg4 from '../assets/images/elements/overview-obj-4.png';

const Overview = () => {
	return (
		<div>
			<section className='overview-section py-10'>
				<div className='map-el'>
					<img src={MapImg} alt='Map' />
				</div>
				<div className='obj-1'>
					<img src={OverImg1} alt='image1' />
				</div>
				<div className='obj-2'>
					<img src={OverImg2} alt='image2' />
				</div>
				<div className='obj-3'>
					<img src={OverImg3} alt='image3' />
				</div>
				<div className='obj-4'>
					<img src={OverImg4} alt='image4' />
				</div>

				<div className='px-4 md:px-12'>
					<div className='flex items-center justify-center'>
						<div
							className='md:w-9/12 wow fadeInUp'
							data-wow-duration='0.5s'
							data-wow-delay='0.3s'
						>
							<div className='section-header text-center my-10'>
								<span className='section-sub-title'>
									Our Users Around the World
								</span>
								<h2 className='section-title'>Let the number speak for us</h2>
								<p className=' text-sm'>
									Over the years we have provided millions of players with
									tickets to lotteries across the globe and enjoyed having more
									than one million winners
								</p>
							</div>
						</div>
					</div>
					{/* <!-- row end --> */}
				</div>
				{/* <!-- container end --> */}
				<div className='map-pointer'>
					<div className='pointer num-1'></div>
					<div className='pointer num-2'></div>
					<div className='pointer num-3'></div>
					<div className='pointer num-4'></div>
					<div className='pointer num-5'></div>
					<div className='pointer num-6'></div>
					<div className='pointer num-7'></div>
					<div className='pointer num-8'></div>
					<div className='pointer num-9'></div>
				</div>

				<div className='px-4 md:px-12 '>
					<div className='grid md:grid-cols-3 gap-4'>
						<div
							className='col-lg-4 col-sm-6 mb-30 wow bounceIn'
							data-wow-duration='0.5s'
							data-wow-delay='0.3s'
						>
							<div className='overview-card hover--effect-1'>
								<div className='overview-card__icon'>
									<img src='assets/images/icon/overview/1.png' alt='' />
								</div>
								<div className='overview-card__content  '>
									<span className='number text-sm '>12000+</span>
									<p className='text-sm'>Verified Users</p>
								</div>
							</div>
							{/* <!-- overview-card end --> */}
						</div>
						<div
							className='col-lg-4 col-sm-6 mb-30 wow bounceIn'
							data-wow-duration='0.5s'
							data-wow-delay='0.5s'
						>
							<div className='overview-card hover--effect-1'>
								<div className='overview-card__icon'>
									<img src='assets/images/icon/overview/2.png' alt='' />
								</div>
								<div className='overview-card__content'>
									<span className='number'>13</span>
									<p>Years on the market</p>
								</div>
							</div>
							{/* <!-- overview-card end --> */}
						</div>
						<div
							className='col-lg-4 col-sm-6 mb-30 wow bounceIn'
							data-wow-duration='0.5s'
							data-wow-delay='0.7s'
						>
							<div className='overview-card hover--effect-1'>
								<div className='overview-card__icon'>
									<img src='assets/images/icon/overview/3.png' alt='' />
								</div>
								<div className='overview-card__content'>
									<span className='number'>98%</span>
									<p className=' text-xs'>Customer Satisfaction</p>
								</div>
							</div>
							{/* <!-- overview-card end --> */}
						</div>
					</div>
				</div>
				{/* <!-- container end --> */}
			</section>
		</div>
	);
};

export default Overview;
