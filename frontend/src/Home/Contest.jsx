import React from 'react';
import Bg1 from '../assets/images/elements/contest-bg.png';
import Icon1 from '../assets/images/icon/btn/car.png';
import Icon2 from '../assets/images/icon/btn/box.png';
import Img1 from '../assets/images/contest/1.png';
import Img2 from '../assets/images/contest/2.png';
import Img3 from '../assets/images/contest/3.png';
import Img4 from '../assets/images/contest/4.png';
import Img5 from '../assets/images/contest/5.png';
import Img6 from '../assets/images/contest/6.png';

const Contest = () => {
	return (
		<div>
			<section className='relative pt-120 pb-120'>
				<div className='bg-el'>
					<img src={Bg1} alt='imageBg1' />
				</div>
				<div className=' px-4 md:mx-auto'>
					<div className='mx-auto '>
						<div
							className='col-lg-8 wow fadeInUp '
							data-wow-duration='0.5s'
							data-wow-delay='0.3s'
						>
							<div className='section-header text-center'>
								<span className='section-sub-title'>
									Try your chance at winning
								</span>
								<h2 className='section-title'>Current Contest</h2>
								<p>
									Participants buy tickets and lots are drawn to determine the
									winners.
								</p>
							</div>
						</div>
					</div>
					{/* <!-- row end --> */}
					<div
						className='row wow fadeInUp '
						data-wow-duration='0.5s'
						data-wow-delay='0.3s'
					>
						<div className=''>
							<ul
								className=' py-4 my-4 flex gap-4 flex-col md:flex-row items-center justify-center'
								id='contestTab'
								role='tablist'
							>
								<li className='nav-item' role='presentation'>
									<a
										className='cmn-btn flex justify-center items-center active'
										id='car-tab'
										data-toggle='tab'
										href='#car'
										role='tab'
										aria-controls='car'
										aria-selected='true'
									>
										<span className='mr-3'>
											<img src={Icon1} alt='icon1' />
										</span>
										<span>Dream Car</span>
									</a>
								</li>
								<li className='nav-item' role='presentation'>
									<a
										className='cmn-btn style--two flex align-items-center'
										id='lifestyle-tab'
										data-toggle='tab'
										href='#lifestyle'
										role='tab'
										aria-controls='lifestyle'
										aria-selected='false'
									>
										<span className='mr-3'>
											<img src={Icon2} alt='icon2' />
										</span>
										All lifestyle
									</a>
								</li>
							</ul>
							<div className='tab-content ' id='contestTabContent'>
								<div
									className='tab-pane fade show active'
									id='car'
									role='tabpanel'
									aria-labelledby='car-tab'
								>
									<div className='space-y-4 mx-auto  w-full'>
										<div className=' '>
											<div className='contest-card'>
												<div className='contest-card__thumb'>
													<img src={Img1} alt='image1' />
													<a href='#0' className='action-icon'>
														<i className='far fa-heart'></i>
													</a>
													<div className='contest-num'>
														<span>contest no:</span>
														<h4 className='number'>b2t</h4>
													</div>
												</div>
												<div className='contest-card__content'>
													<div className='left'>
														<h5 className='contest-card__name'>
															The Breeze Zodiac IX
														</h5>
													</div>
													<div className='right'>
														<span className='contest-card__price'>$3.99</span>
														<p>ticket price</p>
													</div>
												</div>
												<div className='contest-card__footer'>
													<ul className='contest-card__meta'>
														<li>
															<i className='las la-clock'></i>
															<span>5d</span>
														</li>
														<li>
															<i className='las la-ticket-alt'></i>
															<span>9805</span>
															<p>Remaining</p>
														</li>
													</ul>
												</div>
											</div>
											{/* <!-- contest-card end --> */}
										</div>

										<div className=''>
											<div className='contest-card'>
												<div className='contest-card__thumb'>
													<img src={Img2} alt='image2' />
													<a href='#0' className='action-icon'>
														<i className='far fa-heart'></i>
													</a>
													<div className='contest-num'>
														<span>contest no:</span>
														<h4 className='number'>x9u</h4>
													</div>
												</div>
												<div className='contest-card__content'>
													<div className='left'>
														<h5 className='contest-card__name'>
															The Del Sol Trailblazer
														</h5>
													</div>
													<div className='right'>
														<span className='contest-card__price'>$3.99</span>
														<p>ticket price</p>
													</div>
												</div>
												<div className='contest-card__footer'>
													<ul className='contest-card__meta'>
														<li>
															<i className='las la-clock'></i>
															<span>5d</span>
														</li>
														<li>
															<i className='las la-ticket-alt'></i>
															<span>9805</span>
															<p>Remaining</p>
														</li>
													</ul>
												</div>
											</div>
											{/* <!-- contest-card end --> */}
										</div>
										<div className='col-xl-4 col-md-6 mb-30'>
											<div className='contest-card'>
												<div className='contest-card__thumb'>
													<img src={Img3} alt='image3' />
													<a href='#0' className='action-icon'>
														<i className='far fa-heart'></i>
													</a>
													<div className='contest-num'>
														<span>contest no:</span>
														<h4 className='number'>8y3</h4>
													</div>
												</div>
												<div className='contest-card__content'>
													<div className='left'>
														<h5 className='contest-card__name'>
															The Miata Dart IV
														</h5>
													</div>
													<div className='right'>
														<span className='contest-card__price'>$3.99</span>
														<p>ticket price</p>
													</div>
												</div>
												<div className='contest-card__footer'>
													<ul className='contest-card__meta'>
														<li>
															<i className='las la-clock'></i>
															<span>5d</span>
														</li>
														<li>
															<i className='las la-ticket-alt'></i>
															<span>9805</span>
															<p>Remaining</p>
														</li>
													</ul>
												</div>
											</div>
											{/* <!-- contest-card end --> */}
										</div>
										<div className='col-xl-4 col-md-6 mb-30'>
											<div className='contest-card'>
												<div className='contest-card__thumb'>
													<img src={Img4} alt='image4' />
													<a href='#0' className='action-icon'>
														<i className='far fa-heart'></i>
													</a>
													<div className='contest-num'>
														<span>contest no:</span>
														<h4 className='number'>r9d</h4>
													</div>
												</div>
												<div className='contest-card__content'>
													<div className='left'>
														<h5 className='contest-card__name'>
															The Fabia Magnum
														</h5>
													</div>
													<div className='right'>
														<span className='contest-card__price'>$3.99</span>
														<p>ticket price</p>
													</div>
												</div>
												<div className='contest-card__footer'>
													<ul className='contest-card__meta'>
														<li>
															<i className='las la-clock'></i>
															<span>5d</span>
														</li>
														<li>
															<i className='las la-ticket-alt'></i>
															<span>9805</span>
															<p>Remaining</p>
														</li>
													</ul>
												</div>
											</div>
											{/* <!-- contest-card end --> */}
										</div>
										<div className='col-xl-4 col-md-6 mb-30'>
											<div className='contest-card'>
												<div className='contest-card__thumb'>
													<img src={Img5} alt='image5' />
													<a href='#0' className='action-icon'>
														<i className='far fa-heart'></i>
													</a>
													<div className='contest-num'>
														<span>contest no:</span>
														<h4 className='number'>pr2</h4>
													</div>
												</div>
												<div className='contest-card__content'>
													<div className='left'>
														<h5 className='contest-card__name'>
															The Omega Navigator
														</h5>
													</div>
													<div className='right'>
														<span className='contest-card__price'>$3.99</span>
														<p>ticket price</p>
													</div>
												</div>
												<div className='contest-card__footer'>
													<ul className='contest-card__meta'>
														<li>
															<i className='las la-clock'></i>
															<span>5d</span>
														</li>
														<li>
															<i className='las la-ticket-alt'></i>
															<span>9805</span>
															<p>Remaining</p>
														</li>
													</ul>
												</div>
											</div>
											{/* <!-- contest-card end --> */}
										</div>
										<div className='col-xl-4 col-md-6 mb-30'>
											<div className='contest-card'>
												<div className='contest-card__thumb'>
													<img src={Img6} alt='image6' />
													<a href='#0' className='action-icon'>
														<i className='far fa-heart'></i>
													</a>
													<div className='contest-num'>
														<span>contest no:</span>
														<h4 className='number'>w03</h4>
													</div>
												</div>
												<div className='contest-card__content'>
													<div className='left'>
														<h5 className='contest-card__name'>Shelby Cobra</h5>
													</div>
													<div className='right'>
														<span className='contest-card__price'>$3.99</span>
														<p>ticket price</p>
													</div>
												</div>
												<div className='contest-card__footer'>
													<ul className='contest-card__meta'>
														<li>
															<i className='las la-clock'></i>
															<span>5d</span>
														</li>
														<li>
															<i className='las la-ticket-alt'></i>
															<span>9805</span>
															<p>Remaining</p>
														</li>
													</ul>
												</div>
											</div>
											{/* <!-- contest-card end --> */}
										</div>
									</div>
								</div>
								<div
									className='tab-pane fade space-y-4 mt-4'
									id='lifestyle'
									role='tabpanel'
									aria-labelledby='lifestyle-tab'
								>
									<div className=''>
										<div className='col-xl-4 col-md-6 mb-30'>
											<div className='contest-card'>
												<div className='contest-card__thumb'>
													<img src={Img4} alt='image7' />
													<a href='#0' className='action-icon'>
														<i className='far fa-heart'></i>
													</a>
													<div className='contest-num'>
														<span>contest no:</span>
														<h4 className='number'>r9d</h4>
													</div>
												</div>
												<div className='contest-card__content'>
													<div className='left'>
														<h5 className='contest-card__name'>
															The Fabia Magnum
														</h5>
													</div>
													<div className='right'>
														<span className='contest-card__price'>$3.99</span>
														<p>ticket price</p>
													</div>
												</div>
												<div className='contest-card__footer'>
													<ul className='contest-card__meta'>
														<li>
															<i className='las la-clock'></i>
															<span>5d</span>
														</li>
														<li>
															<i className='las la-ticket-alt'></i>
															<span>9805</span>
															<p>Remaining</p>
														</li>
													</ul>
												</div>
											</div>
											{/* <!-- contest-card end --> */}
										</div>
										<div className='col-xl-4 col-md-6 mb-30'>
											<div className='contest-card'>
												<div className='contest-card__thumb'>
													<img src={Img5} alt='image5' />
													<a href='#0' className='action-icon'>
														<i className='far fa-heart'></i>
													</a>
													<div className='contest-num'>
														<span>contest no:</span>
														<h4 className='number'>pr2</h4>
													</div>
												</div>
												<div className='contest-card__content'>
													<div className='left'>
														<h5 className='contest-card__name'>
															The Omega Navigator
														</h5>
													</div>
													<div className='right'>
														<span className='contest-card__price'>$3.99</span>
														<p>ticket price</p>
													</div>
												</div>
												<div className='contest-card__footer'>
													<ul className='contest-card__meta'>
														<li>
															<i className='las la-clock'></i>
															<span>5d</span>
														</li>
														<li>
															<i className='las la-ticket-alt'></i>
															<span>9805</span>
															<p>Remaining</p>
														</li>
													</ul>
												</div>
											</div>
											{/* <!-- contest-card end --> */}
										</div>
										<div className='col-xl-4 col-md-6 mb-30'>
											<div className='contest-card'>
												<div className='contest-card__thumb'>
													<img src={Img6} alt='image6' />
													<a href='#0' className='action-icon'>
														<i className='far fa-heart'></i>
													</a>
													<div className='contest-num'>
														<span>contest no:</span>
														<h4 className='number'>w03</h4>
													</div>
												</div>
												<div className='contest-card__content'>
													<div className='left'>
														<h5 className='contest-card__name'>Shelby Cobra</h5>
													</div>
													<div className='right'>
														<span className='contest-card__price'>$3.99</span>
														<p>ticket price</p>
													</div>
												</div>
												<div className='contest-card__footer'>
													<ul className='contest-card__meta'>
														<li>
															<i className='las la-clock'></i>
															<span>5d</span>
														</li>
														<li>
															<i className='las la-ticket-alt'></i>
															<span>9805</span>
															<p>Remaining</p>
														</li>
													</ul>
												</div>
											</div>
											{/* <!-- contest-card end --> */}
										</div>
									</div>
								</div>
							</div>
							{/* <!-- table content end --> */}
						</div>
					</div>
					{/* <!-- row end--> */}
					<div className='row mt-30'>
						<div className='col-lg-12'>
							<div className='btn-grp'>
								<a href='contest.html' className='btn-border'>
									browse more
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Contest;
