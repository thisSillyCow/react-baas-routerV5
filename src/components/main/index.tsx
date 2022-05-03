import React from 'react'
import {renderRoutes, RouteConfig,} from 'react-router-config';
import {MainContext} from "@/hooks"
import {inject} from 'mobx-react';
import Headers from "./components/header"
import SideMenu from "./components/side-menu"
import "@/styles/components/mian.less"
import {Layout, Tabs} from 'antd';
const {Content,} = Layout;
const {TabPane} = Tabs;
import {MainProps, MainState, TabsMeta} from "@/type/components/main";

@inject(({store}) => (
	{
		setTabsList: store.AppInfo.setTabsList,
		setSideMenu: store.AppInfo.setSideMenu,
		getTabsList: store.AppInfo.getTabsList,
		getSideMenu: store.AppInfo.getSideMenu,
		menuList: store.AppInfo.getMenuList,
	}
))


export default class Main extends React.Component<MainProps, MainState> {
	public constructor(props: MainProps) {
		super(props);
		this.state = {
			collapsed: false,
			activeSideMenu: {
				selectedKey: [],
				openKeys: [],
				suffixName: "",
			},
			menuList: [],
			tabsList: [
				{
					name: "HomePage",
					pathName: "/business/home",
					title: "首页",
				},
			],
		}
	}
	
	public componentDidMount(): void {
		const tabsList = this.props.getTabsList;
		const getPath = this.props.route?.name || "";
		if (tabsList.length != 0) {
			this.setState({
				tabsList,
			})
		}
		this.initSideMenu(getPath);
	}
	
	
	public initSideMenu(getPath: string): void {
		const sideMenuObj = this.props.getSideMenu;
		const menuList = this.props.menuList || "[]"
		let menuTem: RouteConfig[] | undefined = [];
		let menuObj: RouteConfig[] = JSON.parse(menuList);
		for (const moduleKey of menuObj) {
			if (moduleKey.name === getPath) {
				const menuRoutes = moduleKey?.routes || [];
				for (const menuRoute of menuRoutes) {
					if (menuRoute && menuRoute.hideInMenu != false) {
						menuTem?.push(menuRoute)
					}
				}
			}
		}
		console.log("getPath: " + getPath)
		sideMenuObj.suffixName = getPath;
		this.setState({
			menuList: menuTem,
			activeSideMenu: sideMenuObj,
		})
	}
	
	public toggle = (): void => {
		const collapsedType: boolean = this.state.collapsed;
		this.setState({
			collapsed: !collapsedType,
		});
	};
	
	public onTabsClick(routeName: string): void {
		let pathMenu: TabsMeta = {
			name: "",
			pathName: "",
			title: "",
		};
		const {tabsList: tabsListTem} = this.state;
		for (const objRouteElement of tabsListTem) {
			if (objRouteElement.name === routeName) {
				pathMenu = objRouteElement;
				break;
			}
		}
		this.openRoutes(pathMenu, tabsListTem)
	}
	
	public openRoutes(e: TabsMeta, tabsList: Array<TabsMeta>): void {
		const {suffixName} = this.state.activeSideMenu
		const activeKey = e.name
		const pathName = e.pathName
		const parentName = e.parentName || ""
		const sideMenuObj = {openKeys: [parentName], selectedKey: [activeKey], activeMenu: e, suffixName}
		this.props?.setTabsList(tabsList)
		this.props?.setSideMenu(sideMenuObj);
		this.setState({
			tabsList,
			activeSideMenu: sideMenuObj,
		})
		pathName && this.props.history.push({pathname: pathName});
	}
	
	public onTabMenu(eRoute: RouteConfig): void {
		let tabsState: string = "pass";
		const routeName: string = eRoute.name;
		const pathName: string | string[] = eRoute?.path || "";
		const parentName: string = eRoute.parentName;
		const parentTitle: string = eRoute.parentTitle
		const {tabsList: tabsListTem} = this.state;
		const objRoute: TabsMeta = {
			parentName,
			pathName,
			parentTitle,
			name: routeName,
			title: eRoute.meta.title,
		};
		for (const objRouteElement of tabsListTem) {
			if (objRouteElement.name === routeName) {
				tabsState = "out";
				break;
			}
		}
		if (tabsState === "pass") {
			tabsListTem.push(objRoute);
		}
		this.openRoutes(objRoute, tabsListTem);
	}
	
	public onEditTabs(targetKey: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, action: string): void {
		let tabPaneList = [];
		const {tabsList: tabsListTem, activeSideMenu} = this.state;
		const activeKey = activeSideMenu.selectedKey[0]
		let pathMenu: TabsMeta = {
			name: activeKey,
			pathName: "",
			title: "",
		};
		if (action === "remove") {
			for (let i = 0; i < tabsListTem.length; i++) {
				const objRouteElement = tabsListTem[i]
				if (objRouteElement.name != targetKey) {
					tabPaneList.push(objRouteElement)
					continue;
				}
				if (activeKey === targetKey) {
					pathMenu = tabsListTem[i - 1]
				}
			}
		}
		this.openRoutes(pathMenu, tabPaneList);
	}
	
	public onOpenChange(key: string[], kType: string): void {
		let finallyOpen: string = "";
		let {activeSideMenu} = this.state;
		switch (kType) {
			case "subMenu":
				finallyOpen = key.pop() || "";
				activeSideMenu.openKeys = [finallyOpen];
				break;
			case "sideMenu":
				finallyOpen = key.shift() || "";
				activeSideMenu.selectedKey = [finallyOpen];
				break;
		}
		this.setState({
			activeSideMenu,
		})
	}
	
	render() {
		const {route} = this.props
		const {collapsed, tabsList, activeSideMenu, menuList,} = this.state
		return (
			<MainContext.Provider value={[collapsed, activeSideMenu,]}>
				<Layout className="main">
					<SideMenu {...this.props} history={this.props.history}
					          sideMenuList={menuList}
					          onTabClick={this.onTabMenu.bind(this)}
					          onOpenMenu={(e: string[]) => this.onOpenChange(e, "subMenu")}
					/>
					<Layout className="site-layout">
						<Headers {...this.props} history={this.props.history} onToggle={this.toggle.bind(this)}
						         onSuffixChange={(e: string) => this.initSideMenu(e)}/>
						<Content className="site-layout-background" >
							{/*<Tabs hideAdd tabPosition="top" type="editable-card"*/}
							{/*      activeKey={activeSideMenu.selectedKey[0]}*/}
							{/*      onEdit={(targetKey, action) => this.onEditTabs(targetKey, action)}*/}
							{/*      onChange={(e) => this.onTabsClick(e)}>*/}
							{/*	{tabsList.map((item: TabsMeta, index: number) => {*/}
							{/*		return (*/}
							{/*			<TabPane tab={item.title} key={item.name} closable={index != 0}>*/}
							{/*			</TabPane>*/}
							{/*		)*/}
							{/*	})}*/}
							{/*</Tabs>*/}
								<div className="content-render">
									{renderRoutes(route.routes)}
								</div>
						</Content>
					</Layout>
				</Layout>
			</MainContext.Provider>
		)
	}
}
