/**
 * @Author: ZH
 * @createdTime: 2022-02-2022/2/18 14:13
 * @description:
 */
import React from 'react'
import {Menu, Layout, Select, Dropdown, Descriptions, Input,} from 'antd';
const {Header,} = Layout;
import "@/styles/components/mian.less"
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	CaretDownOutlined,
	CaretUpOutlined,
	DownOutlined, SmileOutlined
} from '@ant-design/icons';
import {hProps, hState, tableList} from "@/type/components/main/header";
import {MainContext} from "@/hooks";
import {RouteConfig} from "react-router-config";
import {ItemType} from "antd/es/menu/hooks/useItems";
import Slot from "@/components/slot";
import Util from "@/lib/util";
import {ModalInfo} from "@/lib/local";

const {Option} = Select;

class Headers extends React.Component<hProps, hState> {
	public constructor(props: hProps) {
		super(props);
		this.state = {
			modalDetails: {
				modalVisible: false,
			},
			dropList:[
					{title:"修改密码",titleType:"amendPwd"},
					{title:"退出",titleType:"exit"}
				],
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
	public menuActive(e:tableList){
		if(e.titleType === "exit"){
			// this.props.history.push({pathname: "/business/information/brand-list"});
			console.log( this.props.history.replace(""))
			return;
		}
		let modalTitle: string = "修改密码";
		let modalWidth: number = ModalInfo.MODAL_WIDTH;
		const mDetails = {modalVisible: true, modalTitle, modalWidth};
		this.setState({
			modalDetails: mDetails,
		})
	}
	public onAfterClose(): void {
		const openObj = {
			modalVisible: false,
		};
		this.setState({
			modalDetails: openObj
		})
	}
	public suffixState(eSuffix?: boolean): void {
		const {suffixType} = this.state;
		this.setState({suffixType: eSuffix || !suffixType});
	}
	public getMenuList(): ItemType[] {
		const {dropList} = this.state;
		let menuList: ItemType[] = []
		dropList.forEach((e, index) => {
			let menu = {
				label: (
					<div className="table-menu" key={index} onClick={()=>this.menuActive(e)}><a>{e.title}</a></div>
				),
				key: index,
			}
			menuList.push(menu)
		})
		return menuList
	}
	public menuList():JSX.Element{
		const itemsMenuList: ItemType[] = this.getMenuList()
		return (
			<Menu
				items={itemsMenuList}
			/>
		)
	}
	public checkModal(): JSX.Element {
		return (
			<div>
				<Descriptions bordered column={1}>
					<Descriptions.Item label="用户名">
						<span>用户名</span>
					</Descriptions.Item>
					<Descriptions.Item label="旧密码">
						<Input className="inputText"
						       placeholder={Util.placeholderName('旧密码', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="新密码">
						<Input className="inputText"
						       placeholder={Util.placeholderName('新密码', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="密码确认">
						<Input className="inputText"
						       placeholder={Util.placeholderName('密码确认', "")}
						/>
					</Descriptions.Item>
				</Descriptions>
			</div>
		)
	}
	render() {
		const collapsed = this.context[0],
			{suffixName,activeMenu} = this.context[1];
		const {suffixType, headlineList,modalDetails} = this.state
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
					<Dropdown overlay={this.menuList.bind(this)}>
						<div>用户信息存放处<DownOutlined/></div>
					</Dropdown>
				</div>
				<Slot
					modalDetails={modalDetails}
					afterClose={() => {
						this.onAfterClose()
					}}
					detailsSlot={this.checkModal()}
				/>
			</Header>
		)
	}
}

Headers.contextType = MainContext;
export default Headers

