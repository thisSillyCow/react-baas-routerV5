/**
 * @Author: ZH
 * @createdTime: 2022-02-2022/2/18 14:13
 * @description:
 */
import React from 'react'
import {Layout, Select,} from 'antd';

const {Header,} = Layout;
import "@/styles/components/mian.less"
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	CaretDownOutlined,
	CaretUpOutlined,
} from '@ant-design/icons';
import {hProps, hState} from "@/type/components/main/header";
import {MainContext} from "@/hooks";
import {RouteConfig} from "react-router-config";

const {Option} = Select;

class Headers extends React.Component<hProps, hState> {
	public constructor(props: hProps) {
		super(props);
		this.state = {
			suffixType: false,
			headlineList: [],
		}
	}
	
	public componentDidMount(): void {
		this.getSelectList()
	}
	
	public getSelectList(): void {
		let menuTem = [];
		let menuObj: RouteConfig[] = [];
		const {menuList, route} = this.props;
		if (typeof menuList === "string") {
			menuObj = JSON.parse(menuList);
		}
		for (let i = 2; i < menuObj.length; i++) {
			const moduleKey = menuObj[i];
			delete moduleKey.routes;
			menuTem.push(moduleKey)
		}
		this.setState({
			headlineList: menuTem,
		})
	}
	
	public suffixState(eSuffix?: boolean): void {
		const {suffixType} = this.state;
		this.setState({suffixType: eSuffix || !suffixType});
	}
	
	render() {
		const collapsed = this.context[0],
			{suffixName,activeMenu} = this.context[1];
		const {suffixType, headlineList,} = this.state
		return (
			<Header className="header">
				<div className="side-header">
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: "trigger",
						onClick: () => this.props?.onToggle(),
					})}
					<div className="side-title">
						{activeMenu?.parentTitle || ""} / {activeMenu?.title|| ""}
					</div>
				</div>
				
				<div className="user-info">
					<Select value={suffixName} bordered={false}
					        suffixIcon={suffixType ? <CaretUpOutlined/> : <CaretDownOutlined/>}
					        onClick={() => this.suffixState()}
					        onChange={(e) => this.props.onSuffixChange(e)}
					        onBlur={() => this.suffixState(false)}
					>
						{
							headlineList?.map((item, index) => {
								const routeName = item.name || "";
								const titleName = item.meta.title || "";
								return (<Option value={routeName} key={index}>{titleName}</Option>)
							})
						}
					
					</Select>
					用户信息存放处 你好啊
				</div>
			</Header>
		)
	}
}

Headers.contextType = MainContext;
export default Headers

