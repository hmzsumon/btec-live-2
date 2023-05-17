import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

import { FadeLoader } from 'react-spinners';
import { formatDate } from '../../../utils/functions';

import { Link } from 'react-router-dom';
import { BsArrowLeftSquare } from 'react-icons/bs';
import Layout from '../Layout/Layout';
import { useGetMembersQuery } from '../../../features/auth/authApi';

const MyTeams = () => {
	const { data, isLoading } = useGetMembersQuery();
	const { members } = data || [];

	if (members?.length === 0) {
		return (
			<Layout>
				<div className='flex flex-col items-center justify-center h-full'>
					<div className='flex flex-col items-center justify-center space-y-4'>
						<h1 className='text-2xl font-bold text-gray-100'>
							You have not joined any team yet!
						</h1>
						<Link to='/user-dashboard'>
							<button className='px-4 py-2 text-white bg-blue-500 rounded-md'>
								<BsArrowLeftSquare className='inline-block text-xl' /> Go Back
							</button>
						</Link>
					</div>
				</div>
			</Layout>
		);
	}

	const columns = [
		{
			field: 'name',
			headerName: 'Name',
			minWidth: 200,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div>
						<span>{params.row.name}</span>
					</div>
				);
			},
		},
		{
			field: 'phone',
			headerName: 'Phone',
			headerAlign: 'center',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return <div className='mx-auto '>{params.row.phone}</div>;
			},
		},
		{
			field: 'join_date',
			headerName: 'Join Date',
			headerAlign: 'center',
			type: 'number',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				console.log(params.row);
				return (
					<div className='mx-auto '>
						<span>{formatDate(params.row.join_date)}</span>
					</div>
				);
			},
		},
		{
			field: 'status',
			headerName: 'Status',
			headerAlign: 'center',
			type: 'number',
			minWidth: 100,
			flex: 0.2,
			renderCell: (params) => {
				return (
					<div
						className={`mx-auto ${
							params.row.status ? 'text-green-500' : 'text-red-500'
						} `}
					>
						{params.row.status ? 'Active' : 'Inactive'}
					</div>
				);
			},
		},
	];

	const rows = [];

	members &&
		members.forEach((member) => {
			rows.unshift({
				id: member._id,
				name: member.name,
				phone: member.phone,
				join_date: member.join_date,
				status: member.is_active,
			});
		});

	return (
		<Layout>
			{isLoading ? (
				<div className='flex justify-center items-center mt-24 h-[80%]'>
					<FadeLoader color='#fff' />
				</div>
			) : (
				<div className='px-2 md:px-20'>
					<div className='flex space-x-4 items-center'>
						<Link to='/lottery' className='flex space-x-2 text-green-500 '>
							<span>
								<BsArrowLeftSquare className='text-2xl text-green-500' />
							</span>
							<span>Go Back</span>
						</Link>
						<h1 className='my-4 text-lg font-medium '>
							My members: {members && members.length}
						</h1>
					</div>
					<div
						className='w-full shadow-lg bg-slate-800 rounded-xl'
						style={{ height: 470 }}
					>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={100}
							disableSelectIconOnClick
							sx={{
								boxShadow: 0,
								border: 0,
							}}
						/>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default MyTeams;
