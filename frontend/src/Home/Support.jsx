import React from 'react';
import SupportImg from '../assets/images/icon/support/1.png';
import SupportImg2 from '../assets/images/icon/support/2.png';

const Support = () => {
	return (
		<div>
			<section className='pb-120'>
				<div className=''>
					<div className='row justify-content-center'>
						<div className='col-lg-8'>
							<div className='section-header text-center'>
								<span className='section-sub-title'>
									Get in touch with our friendly support
								</span>
								<h2 className='section-title'>Customer Support</h2>
								<p>
									Have a question or need help? Contact our friendly support
									team.
								</p>
							</div>
						</div>
					</div>
					<div className='md:flex gap-4 px-4'>
						<div
							className=' flex-1 mb-30 wow zoomIn'
							data-wow-duration='0.5s'
							data-wow-delay='0.3s'
						>
							<div className='support-card md:flex gap-4'>
								<div className='support-card__thumb'>
									<img src={SupportImg} alt='image1' />
								</div>
								<div className='support-card__content  '>
									<h3 className='support-card__title md:text-left'>
										Talk to our support team
									</h3>
									<p className='md:text-left'>
										Got a question about Lotteries? Get in touch with our
										friendly staff.
									</p>
									<div className='flex  items-center md:items-start md:justify-between justify-center'>
										<div className='btn-grp flex  mt-3'>
											<a
												href='tel:6564545'
												className='btn-border btn-sm text-capitalize'
											>
												Call us <i className='fas fa-phone-alt'></i>
											</a>
											<a
												href='/cdn-cgi/l/email-protection#6a0e020e002a0d070b030644090507'
												className='cmn-btn btn-sm text-capitalize'
											>
												Email us <i className='far fa-envelope'></i>
											</a>
										</div>
									</div>
								</div>
							</div>
							{/* <!-- support-card end --> */}
						</div>
						<div
							className='col-lg-6 mb-30 wow zoomIn'
							data-wow-duration='0.5s'
							data-wow-delay='0.5s'
						>
							<div className='support-card md:flex gap-4'>
								<div className='support-card__thumb'>
									<img src={SupportImg2} alt='image2' />
								</div>
								<div className='support-card__content'>
									<h3 className='support-card__title md:text-left'>
										Our Guide to 1xluck24
									</h3>
									<p className='md:text-left'>
										Check out our FAQs to see if we can help you out.
									</p>
									<div className='btn-grp  mt-3'>
										<a
											href='faq.html'
											className='btn-border btn-sm text-capitalize'
										>
											FAQs & Help
										</a>
									</div>
								</div>
							</div>
							{/* <!-- support-card end --> */}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Support;
