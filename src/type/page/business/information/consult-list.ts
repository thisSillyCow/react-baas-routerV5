/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/3 17:17
 * @description:咨询列表
 */
import {ColumnsType} from "antd/es/table";
import {TableProps} from "antd";
import {ModalDetails} from "@/type";


export  interface consultState {
	modalDetails:ModalDetails,
	searchInfo:SInfo,
	columns:ColumnsType<tColumns>,
	data:TableProps<tData> |any,
	companyList: Array<cList>;
	editorAboutUsContent: string | void;
	editor:string;
}
interface SInfo {
	cName:string,
	bName:string,
	sName:string,
}
interface cList {
	id:number;
	companyName:string;
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
	time: string;
	state:number;
	stateMsg:string;
}
