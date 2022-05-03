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

interface Information {
	title:string;
	rTitle:string;
	secondaryTitle:string;
	infoTitle:string;
	userTitle:string;
	consultTitle:string;
	classifiedTitle:string;
	journalismTitle:string;
}
interface  Personnel{
	title:string;
	userTitle:string;
	practiceTitle:string;
}
export interface BUSINESS_NAME {
	InformationName:Information;
	PersonnelName:Personnel;
}
