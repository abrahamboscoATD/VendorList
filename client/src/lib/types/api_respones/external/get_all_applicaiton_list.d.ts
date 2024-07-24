// const res = {
// 	message: "",
// 	success: true,
// 	error: false,
// 	statusCode: 200,
// 	data: {
// 		result: [
// 			{
// 				_id: "",
// 				application: "",
// 				vendor: {
// 					_id: "",
// 					name: "",
// 					__v: 0
// 				},
// 				email: "",
// 				phone: "",
// 				support_level: "",
// 				full_name:"",
// 				added_by: "",
// 				createdAt: "",
// 				updatedAt: "",
// 				__v: 0
// 			}
// 		],
// 		pagination: {
// 			page: 1,
// 			total_page: 0,
// 			limit: ""
// 		}
// 	}
// };

// export type TGetAllApplicationListResponse = typeof res;

export interface IGetAllApplicationListResponse {
	message: string;
	success: boolean;
	error: boolean;
	statuscode: number;
	data: {
		result: {
			_id: string;
			application: string;
			vendor: {
				_id: string;
				name: string;
				__v: number;
			};
			email: string;
			phone: string;
			support_level: string;
			full_name?: string;
			added_by: string;
			createdAt: string;
			updatedAt: string;
			__v: number;
		}[];
		pagination: {
			page: number;
			total_page: number;
			limit: string;
		};
	};
}
