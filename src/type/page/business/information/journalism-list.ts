/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/3 17:31
 * @description:新闻列表
 */
import {ColumnsType} from "antd/es/table";
import {TableProps} from "antd";


export  interface journalismState {
	searchInfo:SInfo,
	columns:ColumnsType<tColumns>,
	data:TableProps<tData> |any,
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
