import React from 'react';
import Img1 from '../assets/images/elements/w-el-1.png';
import Img2 from '../assets/images/elements/w-el-2.png';
import Img3 from '../assets/images/elements/w-el-3.png';
import WinnerTeb1 from '../assets/images/icon/winner-tab/1.png';
import WinnerTeb2 from '../assets/images/icon/winner-tab/2.png';
import WinnerTeb3 from '../assets/images/icon/winner-tab/3.png';
import WinnerTeb4 from '../assets/images/icon/winner-tab/4.png';
import WinnerTeb5 from '../assets/images/icon/winner-tab/5.png';
import WinnerCarr from '../assets/images/win-car/6.png';
import WinnerCarr2 from '../assets/images/win-car/4.png';
import WinnerCarr3 from '../assets/images/win-car/3.png';
import WinnerCarr4 from '../assets/images/win-car/2.png';
import WinnerCarr5 from '../assets/images/win-car/1.png';
import WinnerCarr6 from '../assets/images/win-car/5.png';

import Winner1 from '../assets/images/winner/1.png';
import Winner2 from '../assets/images/winner/2.png';
import Winner3 from '../assets/images/winner/3.png';
import Winner4 from '../assets/images/winner/4.png';
import Winner5 from '../assets/images/winner/5.png';
import Winner6 from '../assets/images/winner/6.png';

const LatestWinners = () => {
	return (
		<div>
			<section className='latest-winner-section relative py-20  '>
				<div className='el-1'>
					<img src={Img1} alt='image1' />
				</div>
				<div className='el-2'>
					<img src={Img2} alt='image2' />
				</div>
				<div className='el-3'>
					<img src={Img3} alt='image3' />
				</div>
				<div className=' py-12 px-4 md:px-12'>
					<div className='row justify-content-center'>
						<div
							className='col-lg-8 wow fadeInUp'
							data-wow-duration='0.5s'
							data-wow-delay='0.3s'
						>
							<div className='section-header text-center'>
								<span className='section-sub-title'>
									Meet the latest winners from your favorite contest
								</span>
								<h2 className='section-title'>Latest Winners</h2>
								<p>
									Check your ticket number's to see if you are a Winner in the
									Dream Lottery.
								</p>
							</div>
						</div>
					</div>
					{/* <!-- row end --> */}

					<div
						className='row wow fadeInUp'
						data-wow-duration='0.5s'
						data-wow-delay='0.5s'
					>
						<div>
							<ul
								className='flex text-xs list-none gap-4 mx-auto border-b border-[#2d246d] items-center justify-between'
								id='winnerTab'
								role='tablist'
							>
								<li className='nav-item' role='presentation'>
									<a
										className='nav-link active'
										id='dream-tab'
										data-toggle='tab'
										href='#dream'
										role='tab'
										aria-controls='dream'
										aria-selected='true'
									>
										<div className='icon-thumb '>
											<img src={WinnerTeb1} alt='winner1' />
										</div>
										<p className='  text-center my-1'>Dream Car</p>
									</a>
								</li>
								<li className='nav-item' role='presentation'>
									<a
										className='nav-link'
										id='bike-tab'
										data-toggle='tab'
										href='#bike'
										role='tab'
										aria-controls='bike'
										aria-selected='false'
									>
										<div className='icon-thumb '>
											<img src={WinnerTeb2} alt='winner2' />
										</div>
										<p className=' text-center my-1'>bike</p>
									</a>
								</li>
								<li className='nav-item' role='presentation'>
									<a
										className='nav-link'
										id='watch-tab'
										data-toggle='tab'
										href='#watch'
										role='tab'
										aria-controls='watch'
										aria-selected='false'
									>
										<div className='icon-thumb'>
											<img src={WinnerTeb3} alt='winner3' />
										</div>
										<p className='text-center my-1'>watch</p>
									</a>
								</li>
								<li className='nav-item' role='presentation'>
									<a
										className='nav-link'
										id='laptop-tab'
										data-toggle='tab'
										href='#laptop'
										role='tab'
										aria-controls='laptop'
										aria-selected='false'
									>
										<div className='icon-thumb'>
											<img src={WinnerTeb4} alt='winner4' />
										</div>
										<p className=' text-center my-1'>laptop</p>
									</a>
								</li>
								<li className='nav-item' role='presentation'>
									<a
										className='nav-link'
										id='money-tab'
										data-toggle='tab'
										href='#money'
										role='tab'
										aria-controls='money'
										aria-selected='false'
									>
										<div className='icon-thumb'>
											<img src={WinnerTeb5} alt='winner5' />
										</div>
										<p className=' text-center my-1'>Money</p>
									</a>
								</li>
							</ul>
							<div className='tab-content mt-20' id='winnerTabContent'>
								<div
									className='tab-pane fade show active'
									id='dream'
									role='tabpanel'
									aria-labelledby='dream-tab'
								>
									<div className='grid gap-4 grid-cols-12'>
										{/* Check form */}
										<div className='col-span-12 md:col-span-4'>
											<div className='number-check-wrapper'>
												<h3 className='title'>Check My Numbers</h3>
												<p>
													Are you holding on to a winning ticket? Here's an easy
													way to find out.
												</p>
												<form className='check-number-form'>
													<input
														type='tel'
														className='form-control mt-30 w-full mb-30'
														name='check-number1'
														id='check-number1'
														placeholder='Enter Contest No'
													/>
													<div className='number-list-wrapper'>
														<p>Enter Your Lottery Numbers</p>
														<div className='number-list mt-3 mb-3'>
															<input
																type='text'
																name='text1'
																id='text1'
																placeholder='0'
															/>
															<input
																type='text'
																name='text2'
																id='text2'
																placeholder='0'
															/>
															<input
																type='text'
																name='text3'
																id='text3'
																placeholder='0'
															/>
															<input
																type='text'
																name='text4'
																id='text4'
																placeholder='0'
															/>
															<input
																type='text'
																name='text5'
																id='text5'
																placeholder='0'
															/>
															<input
																type='text'
																name='text6'
																id='text6'
																placeholder='0'
															/>
														</div>
														{/* <!-- number-list end --> */}
														<select className='nice-select'>
															<option>Last 7 days</option>
															<option>Last 6 days</option>
															<option>Last 5 days</option>
															<option>Last 4 days</option>
															<option>Last 3 days</option>
														</select>
														<div className='text-center mt-100'>
															<button type='submit' className='cmn-btn'>
																check my numbers
															</button>
														</div>
													</div>
												</form>
											</div>
										</div>
										<div className='col-span-12 md:col-span-8 mb-30'>
											{/* Winner Card 1 */}
											<div className='winner-card mb-30'>
												<div className='winner-card__thumb'>
													<img src={WinnerCarr} alt='Winner6' />
												</div>
												<div className='winner-card__content'>
													<div className='winner-thumb'>
														<img src={Winner1} alt='Winner1' />
													</div>
													<div className='content-top'>
														<div className='left'>
															<h5 className='text-sm'>The Breeze Zodiac IX</h5>
														</div>
														<div className='right '>
															<span>Draw took place on</span>
															<p>Saturday April 20, 2020</p>
														</div>
													</div>
													<div className='content-bottom'>
														<div className='number-list-wrapper'>
															<p>Winning Numbers:</p>
															<ul className='number-list mt-2'>
																<li>1</li>
																<li>8</li>
																<li>2</li>
																<li>9</li>
																<li>1</li>
																<li>2</li>
															</ul>
															{/* <!-- number-list end --> */}
														</div>
														<div className='right'>
															<p>Contest No:</p>
															<span className='contest-num'>B2T</span>
														</div>
													</div>
												</div>
											</div>
											{/* <!-- winner-card end --> */}
											{/* Winner Card 2 */}
											<div className='winner-card mb-30'>
												<div className='winner-card__thumb'>
													<img src={WinnerCarr2} alt='Winner-car2' />
												</div>
												<div className='winner-card__content'>
													<div className='winner-thumb'>
														<img src={Winner2} alt='Winner2' />
													</div>
													<div className='content-top'>
														<div className='left'>
															<h5 className=' text-sm'>The Breeze Zodiac IX</h5>
														</div>
														<div className='right'>
															<span>Draw took place on</span>
															<p>Saturday April 20, 2020</p>
														</div>
													</div>
													<div className='content-bottom'>
														<div className='number-list-wrapper'>
															<p>Winning Numbers:</p>
															<ul className='number-list mt-2'>
																<li>5</li>
																<li>8</li>
																<li>2</li>
																<li>8</li>
																<li>1</li>
																<li>2</li>
															</ul>
															{/* <!-- number-list end --> */}
														</div>
														<div className='right'>
															<p>Contest No:</p>
															<span className='contest-num'>B2T</span>
														</div>
													</div>
												</div>
											</div>
											{/* <!-- winner-card end --> */}
											{/* Winner Card 3 */}
											<div className='winner-card mb-30'>
												<div className='winner-card__thumb'>
													<img src={WinnerCarr3} alt='Winner-3' />
												</div>
												<div className='winner-card__content'>
													<div className='winner-thumb'>
														<img src={Winner3} alt='Winner3' />
													</div>
													<div className='content-top'>
														<div className='left'>
															<h5 className=' text-sm'>The Breeze Zodiac IX</h5>
														</div>
														<div className='right'>
															<span>Draw took place on</span>
															<p>Saturday April 20, 2020</p>
														</div>
													</div>
													<div className='content-bottom'>
														<div className='number-list-wrapper'>
															<p>Winning Numbers:</p>
															<ul className='number-list mt-2'>
																<li>1</li>
																<li>8</li>
																<li>3</li>
																<li>9</li>
																<li>9</li>
																<li>6</li>
															</ul>
															{/* <!-- number-list end --> */}
														</div>
														<div className='right'>
															<p>Contest No:</p>
															<span className='contest-num'>B2T</span>
														</div>
													</div>
												</div>
											</div>
											{/* <!-- winner-card end --> */}
											{/* Winner Card 4 */}
											<div className='winner-card mb-30'>
												<div className='winner-card__thumb'>
													<img src={WinnerCarr4} alt='Winner-4' />
												</div>
												<div className='winner-card__content'>
													<div className='winner-thumb'>
														<img src={Winner4} alt='Winner4' />
													</div>
													<div className='content-top'>
														<div className='left'>
															<h5 className=' text-sm'>The Breeze Zodiac IX</h5>
														</div>
														<div className='right'>
															<span>Draw took place on</span>
															<p>Saturday April 20, 2020</p>
														</div>
													</div>
													<div className='content-bottom'>
														<div className='number-list-wrapper'>
															<p>Winning Numbers:</p>
															<ul className='number-list mt-2'>
																<li>8</li>
																<li>3</li>
																<li>9</li>
																<li>1</li>
																<li>2</li>
																<li>7</li>
															</ul>
															{/* <!-- number-list end --> */}
														</div>
														<div className='right'>
															<p>Contest No:</p>
															<span className='contest-num'>B2T</span>
														</div>
													</div>
												</div>
											</div>
											{/* <!-- winner-card end --> */}
											{/* Winner Card 5 */}
											<div className='winner-card mb-30'>
												<div className='winner-card__thumb'>
													<img src={WinnerCarr5} alt='Winner5' />
												</div>
												<div className='winner-card__content'>
													<div className='winner-thumb'>
														<img src={Winner5} alt='Winner5' />
													</div>
													<div className='content-top'>
														<div className='left'>
															<h5 className=' text-sm'>The Breeze Zodiac IX</h5>
														</div>
														<div className='right'>
															<span>Draw took place on</span>
															<p>Saturday April 20, 2020</p>
														</div>
													</div>
													<div className='content-bottom'>
														<div className='number-list-wrapper'>
															<p>Winning Numbers:</p>
															<ul className='number-list mt-2'>
																<li>1</li>
																<li>8</li>
																<li>3</li>
																<li>9</li>
																<li>1</li>
																<li>2</li>
															</ul>
															{/* <!-- number-list end --> */}
														</div>
														<div className='right'>
															<p>Contest No:</p>
															<span className='contest-num'>B2T</span>
														</div>
													</div>
												</div>
											</div>
											{/* <!-- winner-card end --> */}
											<div className='winner-card mb-30'>
												<div className='winner-card__thumb'>
													<img src={WinnerCarr6} alt='Winner6' />
												</div>
												<div className='winner-card__content'>
													<div className='winner-thumb'>
														<img src={Winner6} alt='Winner6' />
													</div>
													<div className='content-top'>
														<div className='left'>
															<h5 className=' text-sm'>The Breeze Zodiac IX</h5>
														</div>
														<div className='right'>
															<span>Draw took place on</span>
															<p>Saturday April 20, 2020</p>
														</div>
													</div>
													<div className='content-bottom'>
														<div className='number-list-wrapper'>
															<p>Winning Numbers:</p>
															<ul className='number-list mt-2'>
																<li>9</li>

																<li>3</li>
																<li>9</li>
																<li>1</li>
																<li>6</li>
																<li>8</li>
															</ul>
															{/* <!-- number-list end --> */}
														</div>
														<div className='right'>
															<p>Contest No:</p>
															<span className='contest-num'>B2T</span>
														</div>
													</div>
												</div>
											</div>
											{/* <!-- winner-card end --> */}
											<div className='btn-grp'>
												<a href='winner.html' className='btn-border'>
													browse more
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* <!-- tab-content end --> */}
						</div>
					</div>
					{/* <!-- row end --> */}
				</div>
			</section>
		</div>
	);
};

export default LatestWinners;
