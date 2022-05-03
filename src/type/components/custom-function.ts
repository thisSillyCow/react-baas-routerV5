import { RouteComponentProps} from 'react-router-dom'

export interface InputState {
	pathName:string,
	searchValue:string,
}

export interface InputProps  extends  RouteComponentProps<any>{
	sValue:string;
	placeMsg?: string,
	placeType:string,
}

export interface ButtonProps  extends  RouteComponentProps<any>{
	placeMsg?: string,
	placeType:string,
	search?:Function,
}
export  interface ButtonState {
	 searchInfo:object,
	pathName:string,
	
}
export  interface dSearch {
	pathname:string,
	sMsg:string,
	sValue:string,
}
export  interface rSearch {
	pathName:string,
	sMsg:string,
}

interface directives{
	name:string;
	value:string;
	state?:number;
}
export  interface tableList {
	title:string;
	directives?:directives;
	action:Function;
}
export  interface tableState {
	dropList:Array<tableList>;
	tableList:Array<tableList>;
	dropState:string;
}
export  interface tableProps {
	tableAction:Array<tableList>;
}
