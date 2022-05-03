import {ModalDetails} from "@/type";
import {RouteComponentProps} from "react-router-dom";
import {ColumnsType} from "antd/es/table";
import {TableProps} from "antd";

interface SInfo {
	cName:string,
	bName:string,
	sName:string,
}
interface tColumns {
	title:string;
	dataIndex:string;
	key:string;
	render?:Function;
	
}
export interface tData{
	key:number;
	name: string;
	age: number;
	address: string;
	description: string;
	state:number;
	stateMsg:string;
}
export interface  CompanyState {
	seconds: number,
	searchInfo:SInfo,
	modalDetails:ModalDetails,
	columns:ColumnsType<tColumns>,
	data:TableProps<tData> |any,
}

export  interface CompanyProps  extends  RouteComponentProps<any>  {
	count:string,
	increase:Function,
}
