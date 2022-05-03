import {ColumnsType} from "antd/es/table";
import {TableProps} from "antd";

/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/3 16:28
 * @description:
 */
export  interface secondaryState {
	searchInfo:SInfo,
	columns:ColumnsType<tData>,
	data:TableProps<tColumns> |any,
	// data:Array<tData>,
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
