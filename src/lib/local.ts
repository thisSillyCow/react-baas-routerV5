import {COMPANY_INFO, HINT_INFO, USER_VERIFY, APP_MODEL_NAME,} from "@/type/lib/local";

export const EventSearch: string = "searchMsg";
export const EventReset: string = "resetMsg";
export const ProjectName: string = "/baas-api/";
export const CompanyInfo: COMPANY_INFO = {
	name: "深圳创链数据科技有限公司",
	encoding: "Copyright © www.innochain.tech, All Rights Reserved.",
}

export const HintInfo: HINT_INFO = {
	duration: 3,
}
export const UserVerify: USER_VERIFY = {
	pwd: 10,
	minPwd: 2,
	name: 20,
	minName: 2,
	code: 5,
}

export const AppModelName: APP_MODEL_NAME = {
	tabsName: "tabsMeta",
	titleName: "tabsTitle",
	sideSelected:"sideSelect",
}


export enum ModalInfo{
	CANCEL_NAME="取消",
	CONFIRM_NAME="确定",
	MODAL_TITLE="温馨提示",
}
