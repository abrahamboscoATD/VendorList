const response = {
	message: 'Successful Response',
	success: true,
	error: false,
	statusCode: 200,
	data: {
		user: {
			_id: '6602482d149ce247f26ec885',
			username: 'Nada',
			password: '',
			email: 'nadaalruwaish@gmail.com',
			first_name: '',
			last_name: '',
			profile_pic: '',
			user_token: '',
			role: 'viwer',
			createdAt: '2024-03-26T03:59:41.891Z',
			updatedAt: '2024-03-26T03:59:41.891Z',
			__v: 0
		},
		token: ''
	}
};

response.data.user.role = 'viwer' as 'super_admin' | 'admin' | 'viewer';

export type TAuthLoginResponse = typeof response;
