export interface IApiResponse<T> {
	message: string;
	success: boolean;
	error: boolean;
	statusCode: number;
	data: T;
}
