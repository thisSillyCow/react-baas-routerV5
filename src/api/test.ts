import {GetAxios} from "@/lib/servers"
const CompanyApi :string= "/baas-api/company/";
export const informationApi = {
	//查询公司列表
	getCompanyAll: () => {
		return GetAxios(`${CompanyApi}get/all`, );
	},
}
