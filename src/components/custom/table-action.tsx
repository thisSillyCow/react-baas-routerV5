/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/1 23:47
 * @description:
 */
import React, {JSXElementConstructor} from 'react'
import {Menu, Dropdown, Space} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {tableList, tableProps, tableState} from "@/type/components/custom-function";
import {ItemType} from "antd/es/menu/hooks/useItems";

export default class tableAction extends React.Component<tableProps, tableState> {
	public constructor(props: tableProps) {
		super(props);
		this.state = {
			dropList: [],
			tableList: [],
			dropState: "close",//【"open：开启"】【"close：关闭"】
		}
	}
	
	public componentDidMount(): void {
		let dropState: string = "close";
		let dropList: Array<tableList> = [];
		let oAction: Array<tableList> = this.props?.tableAction;
		if (oAction.length > 3) {
			dropList = oAction.slice(2, oAction.length)
			oAction = oAction.slice(0, 2)
			dropState = "open";
		}
		this.setState({
			tableList: oAction,
			dropState,
			dropList,
		})
	}
	
	public componentWillUnmount(): void {
	
	}
	
	public getMenuList(): ItemType[] {
		const {dropList} = this.state;
		let menuList: ItemType[] = []
		dropList.forEach((e, index) => {
			let menu = {
				label: (
					<div className="table-menu" key={index} onClick={()=>e.action(e)}><a>{e.title}</a></div>
				),
				key: index,
			}
			menuList.push(menu)
		})
		return menuList
	}
	
	public menu(): JSX.Element {
		const itemsMenuList: ItemType[] = this.getMenuList()
		return (
			<Menu
				items={itemsMenuList}
			/>
		)
	}
	
	public dropDownList(): JSX.Element {
		return (
			<Dropdown overlay={this.menu.bind(this)}>
				<a onClick={e => e.preventDefault()} className="drop-space">
					更多
					<DownOutlined/>
				</a>
			</Dropdown>
		)
	}
	
	render() {
		const {tableList, dropState} = this.state;
		return (
			<div className="table-section">
				{
					tableList.map((item: tableList, index: number) => {
						return (
							<div className="table-menu" key={index} onClick={()=>item.action(item)}><a>{item.title}</a></div>
						)
					})
				}
				{
					dropState === "open" && this.dropDownList()
				}
			</div>
		);
	}
}
