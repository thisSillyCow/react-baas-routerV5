import {RouteConfig} from "react-router-config";
import {History, LocationState} from "history";
import {ModalDetails} from "@/type";

export interface hProps {
	onToggle: Function,
	onSuffixChange: Function,
	route?: RouteConfig,
	menuList?: string | undefined,
	history: History<LocationState>,
}

export interface hState {
	modalDetails:ModalDetails,
	suffixType: boolean,
	headlineList?: RouteConfig[],
	dropList:Array<tableList>;
}
export  interface tableList {
	title:string;
	titleType:string;
	directives?:directives;
	action?:Function;
}
interface directives{
	name:string;
	value:string;
	state?:number;
}
