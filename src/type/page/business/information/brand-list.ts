import {RouteComponentProps} from "react-router-dom";

/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/2 12:51
 * @description:
 */
export interface BrandProps extends  RouteComponentProps<any>{

}

class SingleValueType {
}

export interface BrandState{
	editorAboutUsContent:string | void;
	editorContent:string | void;
	loading:boolean;
	options:Array<SingleValueType>;
	createInfo:cInfo;
}
interface cInfo {
	defaultValue:Array<string>;
}
