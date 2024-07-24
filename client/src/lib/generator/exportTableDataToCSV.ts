import type { IGetAllApplicationListResponse } from "../types/api_respones/external/get_all_applicaiton_list";

export default function exportTableDataToCSV(data: IGetAllApplicationListResponse["data"]["result"]) {
	let data_to_write = `,serial,name,vendor,fullname,phone,email,support level\n`;

	data.forEach((v, idx) => {
		data_to_write += `${idx},${v.application},${v.vendor?.name ?? "deleted"},${v.full_name ?? "N/A"},${v.phone},${v.email},${v.support_level}\n`;
	});

	const aTag = document.createElement("a");
	aTag.download = "application table data.csv";
	aTag.href = encodeURI(`data:text/csv;charset=utf-8;\n${data_to_write}`);
	aTag.style.display = "none";
	document.body.appendChild(aTag);
	aTag.click();
}
