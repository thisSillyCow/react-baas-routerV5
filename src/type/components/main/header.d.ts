import {RouteConfig} from "react-router-config";
import {History, LocationState} from "history";

export interface hProps {
	onToggle: Function,
	onSuffixChange: Function,
	route?: RouteConfig,
	menuList?: string | undefined,
	history: History<LocationState>,
}

export interface hState {
	suffixType: boolean,
	headlineList?: RouteConfig[],
}
