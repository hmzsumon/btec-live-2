import React, { useState } from 'react';
import Icon1 from '../../../assets/screen.png';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';

const Upload = ({ image, setImage }) => {
	const [loading, setLoading] = useState(false);
	const [imgInfo1, setImgInfo1] = useState({
		file1: [],
		imagePreviewUrl_1: null,
	});
	const [confirm, setConfirm] = useState(false);

	let reader = new FileReader();

	const handleInputChange = (event) => {
		setLoading(true);
		const imageFile = event.target.files[0];
		const imageFilname = event.target.files[0].name;

		if (!imageFile) {
			toast.error('Please select image.');
			setLoading(false);
			return false;
		}

		if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/)) {
			toast.error('Please select valid image JPG,JPEG,PNG');
			setLoading(false);
			return false;
		}
		reader.onload = (e) => {
			const img = new Image();
			img.onload = () => {
				//------------- Resize img code ----------------------------------
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);

				var MAX_WIDTH = 437;
				var MAX_HEIGHT = 437;
				var width = img.width;
				var height = img.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0, width, height);
				ctx.canvas.toBlob(
					(blob) => {
						const file = new File([blob], imageFilname, {
							type: 'image/jpeg',
							lastModified: Date.now(),
						});
						setImgInfo1({
							...imgInfo1,
							file1: file,
							imagePreviewUrl_1: URL.createObjectURL(imageFile),
						});
					},
					'image/jpeg',
					1
				);
			};
			img.onerror = () => {
				toast.error('Invalid image content.');
				setLoading(false);
				return false;
			};
			//debugger
			img.src = e.target.result;
		};
		reader.readAsDataURL(imageFile);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	// handel cancel button
	const handleCancel = () => {
		setImgInfo1({
			...imgInfo1,
			imagePreviewUrl_1: null,
		});
		setImage(null);
	};

	// handle confirm button
	const handleConfirm = () => {
		setImage(imgInfo1.file1);
		setConfirm(true);
	};
	return (
		<div className='w-full p-4 mx-auto border rounded-md  '>
			{loading ? (
				<div className='flex items-center justify-center w-full h-[50vh] '>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<>
					<div>
						{imgInfo1.imagePreviewUrl_1 ? (
							<img
								src={imgInfo1.imagePreviewUrl_1}
								alt='Icon'
								className='py-2 mx-auto rounded w-44'
							/>
						) : (
							<img
								src={Icon1}
								alt='Icon'
								className='py-2 mx-auto rounded w-44'
							/>
						)}
					</div>
					{!confirm && (
						<>
							<p className='my-2 text-xs text-center'>
								Please upload a screenshot of your document.
							</p>
							{imgInfo1.imagePreviewUrl_1 ? (
								<div className='grid grid-cols-2 gap-4'>
									<button
										type='button'
										className='w-full py-2 bg-red-500 rounded'
										onClick={handleCancel}
									>
										Cancel
									</button>
									<button
										type='button'
										className='w-full py-2 bg-green-500 rounded'
										onClick={handleConfirm}
									>
										Confirm
									</button>
								</div>
							) : (
								<div className='upload'>
									<button type='button' className='btn-warning'>
										<AiOutlineCloudUpload /> Upload File
										<input
											type='file'
											accept='image/*'
											onChange={handleInputChange}
										/>
									</button>
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Upload;

// import Icon2 from '../../assets/icon/bet365_8_id_b.png';
// import Icon3 from '../../assets/icon/profile.png';
// /verification/submit'
