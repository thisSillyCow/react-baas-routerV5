import {ModalDetails} from "@/type";

interface SInfo {
	cName:string,
	bName:string,
	sName:string,
}

export interface  CompanyState {
	seconds: number,
	searchInfo:SInfo,
	modalDetails:ModalDetails,
}

export  interface CompanyProps  {
	count:string,
	increase:Function,
}
