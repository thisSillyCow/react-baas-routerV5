import {RouteConfig} from "react-router-config";

export interface MainProps {
	route?: RouteConfig | any,
	history?: RouteConfig | any,
	menuList: string | undefined,
	getTabsList: TabsMeta[],
	getOpenName: string,
	getSelectedTitle: string,
	getSideMenu: activeSide,
	setTabsList: Function,
	setSelectedKey: Function,
	setOpenKeys: Function,
	setSideMenu: Function,
}
export interface MainState {
	collapsed: boolean,
	activeSideMenu: activeSide;
	tabsList: TabsMeta[],
	menuList: RouteConfig[],
}

export interface TabsMeta {
	name: string,
	pathName: string | string[],
	title: string,
	parentName?: string,
	parentTitle?: string,
}
export interface activeSide {
	selectedKey: string[],
	openKeys: string[],
	suffixName: string,
	activeMenu?: TabsMeta,
}

