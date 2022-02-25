export interface COMPANY_INFO {
	name: string,
	encoding: string,
}

export interface USER_VERIFY {
	pwd: number,
	minPwd: number,
	name: number,
	minName: number,
	code: number,
}

export interface HINT_INFO {
	duration: number,
}

export interface APP_MODEL_NAME {
	tabsName: string,
	titleName: string,
	sideSelected:string,
}
