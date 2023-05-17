import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import Img1 from '../../../assets/banner/banner1.png';
import Img2 from '../../../assets/banner/banner2.png';
import Img3 from '../../../assets/banner/banner3.png';
import Img4 from '../../../assets/banner/banner4.png';

const images = [Img1, Img2, Img3, Img4];

const Carousel = () => {
	const items = images.map((img) => {
		return (
			<div className='flex flex-col items-center text-white list-none cursor-pointer'>
				<img src={img} alt='' className=' w-[20rem]' />
			</div>
		);
	});

	const responsive = {
		0: {
			items: 1,
		},
		512: {
			items: 3,
		},
	};

	return (
		<div className='flex items-center px-1 py-4 rounded-md wallet-banner'>
			<AliceCarousel
				mouseTracking
				infinite
				autoPlayInterval={1000}
				animationDuration={1500}
				disableDotsControls
				disableButtonsControls
				responsive={responsive}
				items={items}
				autoPlay
			/>
		</div>
	);
};

export default Carousel;
