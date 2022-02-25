import { RouteComponentProps} from 'react-router-dom'

export interface InputState {
	pathName:string,
	bordered: boolean,
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
