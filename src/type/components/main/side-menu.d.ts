import {RouteConfig} from "react-router-config";
import { History, LocationState } from "history";
export  interface sProps {
	route?: RouteConfig,
	sideMenuList:RouteConfig[],
	history: History<LocationState>;
	onTabClick:Function,
	onOpenMenu:Function,
}

export  interface  sState{

}
