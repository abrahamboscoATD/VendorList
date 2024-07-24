export interface IUser {
	_id: string;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	profile_pic: string;
	user_token: string;
	role: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	iat: number;
	exp: number;
}
