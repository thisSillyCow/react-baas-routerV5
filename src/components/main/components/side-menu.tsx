/**
 * @Author: ZH
 * @createdTime: 2022-02-2022/2/18 14:13
 * @description:
 */
import React from 'react'
import {Layout, Menu} from 'antd';
import {RouteConfig} from "react-router-config";
import {MainContext} from "@/hooks";
import {sProps, sState} from "@/type/components/main/side-menu";
import "@/styles/components/mian.less"

const {Sider} = Layout
const {SubMenu} = Menu;


class SideMenu extends React.Component<sProps, sState> {
	public constructor(props: sProps) {
		super(props);
		this.state = {}
	}
	
	public componentDidMount(): void {
		// 声明一个自定义事件
	}
	
	// 组件销毁前移除事件监听
	public componentWillUnmount(): void {
	
	}
	
	
	render() {
		const collapsed = this.context[0],
			{selectedKey, openKeys} = this.context[1];
		const {sideMenuList} = this.props;
		return (
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="logo"/>
				<Menu
					theme="dark"
					mode="inline"
					selectedKeys={selectedKey}
					openKeys={openKeys}
					onOpenChange={(e) => this.props?.onOpenMenu(e)}
				>
					{
						sideMenuList?.map((item: RouteConfig,) => {
							const childMenuList = item.routes || [];
							const parentName: string = item.name || "";
							const parentTitle: string = item.meta.title || "";
							return (
								<SubMenu key={item.name}  title={parentTitle}>
									{
										childMenuList.map((items) => {
											items.parentName = parentName;
											items.parentTitle = parentTitle;
											return (
												<Menu.Item key={items.name}
												           onClick={() => this.props?.onTabClick(items)}>{items.meta.title}</Menu.Item>
											)
										})
									}
								</SubMenu>
							)
						})
					}
				</Menu>
			</Sider>
		)
	}
}

SideMenu.contextType = MainContext;

export default SideMenu
