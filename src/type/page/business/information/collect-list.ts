/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/3 16:46
 * @description: 用户信息列表
 */
import {ColumnsType} from "antd/es/table";
import {TableProps} from "antd";


export  interface collectState {
	searchInfo:SInfo,
	columns:ColumnsType<tData>,
	data:TableProps<tColumns> |any,
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
	description: string;
	state:number;
	stateMsg:string;
}
