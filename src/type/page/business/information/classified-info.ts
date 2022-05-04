/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/3 17:25
 * @description: 分类信息
 */
import {ColumnsType} from "antd/es/table";
import {TableProps} from "antd";
import {ModalDetails} from "@/type";


export  interface classifiedState {
	loading:boolean;
	editor:string;
	modalDetails:ModalDetails,
	searchInfo:SInfo,
	columns:ColumnsType<tColumns>,
	data:TableProps<tData> |any,
	editorAboutUsContent: string | void;
	companyList: Array<cList>;
}
interface cList {
	id:number;
	companyName:string;
}
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
	time: string;
	state:number;
	stateMsg:string;
}
