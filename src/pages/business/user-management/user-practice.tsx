/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/1 12:57
 * @description:人员操作
 */
import React from 'react'
import Search from "@/components/search/search";
import {Descriptions, Input, Select, Table,Radio} from "antd";
import PaginationPage from "@/components/custom/custom-pagination";
import {modalState, tData} from "@/type/page/business/information/company-list";
import {tableList} from "@/type/components/custom-function";
import TableAction from "@/components/custom/table-action";
import {dataTemporary} from "@/lib/temporary";
import {userPracticeState} from "@/type/page/business/user-management/user-practice";
import Util from "@/lib/util";
import { ModalInfo} from "@/lib/local";
import Slot from "@/components/slot";
const {Option} = Select;
export default class index extends React.Component<any, userPracticeState> {
	public constructor(props: any) {
		super(props);
		this.state = {
			modalDetails: {
				modalVisible: false,
			},
			searchInfo: {
				cName: "",
				bName: "",
				sName: "",
			},
			operateList:[
				{id: 1, companyName: "超级管理员"},
				{id: 2, companyName: "管理员"},
				{id: 3, companyName: "普通员工"},
			],
			data: dataTemporary,
			columns: [
				{title: 'Id', dataIndex: 'key', key: 'Id'},
				{title: '人员名称', dataIndex: 'name', key: 'name'},
				{title: '操作状态', dataIndex: 'name', key: 'name'},
				{title: '联系方式', dataIndex: 'age', key: 'age'},
				{title: '创建时间', dataIndex: 'time', key: 'time'},
				{title: '状态', dataIndex: 'name', key: 'name'},
				{
					title: '操作',
					dataIndex: '',
					key: 'x',
					render: (params: tData) => {
						const tableAction: Array<tableList> = [
							{
								title: "查看",
								directives: {name: "privilege", value: "brand:detail"},
								action: () => {
									console.log("查看", params)
								},
							},
							{
								title: "重制密码",
								directives: {name: "privilege", value: "brand:detail"},
								action: () => {
									console.log("重制密码", params)
								},
							},
							{
								title: "修改",
								directives: {name: "privilege", value: "brand:detail"},
								action: () => {
									console.log("修改", params)
								},
							},
							{
								title: "启用",
								directives: {name: "privilege", value: "brand:detail"},
								action: () => {
									console.log("启用", params)
								},
							},
						]
						return <TableAction tableAction={tableAction}/>
					},
				},
			],
		}
	}
	
	
	public componentDidMount(): void {
	
	}
	
	public componentWillUnmount(): void {
	
	}
	
	public search(e: any): void {
		// console.log(e)
	}
	

	
	public openMode(mObj: modalState): void {
		const {oType} = mObj
		let modalTitle: string = ModalInfo.MODAL_TITLE;
		let modalWidth: number = ModalInfo.MODAL_WIDTH;
		switch (oType) {
			case "add":
				modalTitle = ModalInfo.ADD_TITLE + "操作人员";
				modalWidth = 1000;
				break;
		}
		
		const mDetails = {modalVisible: true, modalTitle, modalWidth};
		this.setState({
			modalDetails: mDetails,
		})
	}
	
	public handleCompany(value: string, option: object): void {
		// const {searchInfo: sInfo} = this.state
		// sInfo.companyName = value
		// // @ts-ignore
		// sInfo.companyId = parseInt(option?.key);
		// this.setState({
		// 	searchInfo: sInfo,
		// })
	}
	
	public onAfterClose(): void {
		const mDetails = {modalVisible: false, modalWidth:1000};
		this.setState({
			modalDetails: mDetails
		})
	}
	
	public checkModal(): JSX.Element {
		const {operateList} = this.state;
		return (
			<div>
				<Descriptions bordered column={{xl: 2, lg: 2, md: 2, sm: 2, xs: 1}}>
					<Descriptions.Item label="人员名称">
						<Input className="inputText"
						       placeholder={Util.placeholderName('人员名称', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="登陆用户名">
						<Input className="inputText"
						       placeholder={Util.placeholderName('登陆用户名', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="操作等级">
						<Select onChange={this.handleCompany.bind(this)} allowClear
						        placeholder={Util.placeholderName("操作等级", "select")} className="inputText">
							{
								operateList.map((e, index) => {
										return (
											<Option key={index} value={e.companyName}>{e.companyName}</Option>
										)
									}
								)
							}
						</Select>
					</Descriptions.Item>
					<Descriptions.Item label="身份证">
						<Input className="inputText"
						       placeholder={Util.placeholderName('身份证', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="email">
						<Input className="inputText"
						       placeholder={Util.placeholderName('email', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="联系电话">
						<Input className="inputText"
						       placeholder={Util.placeholderName('联系电话', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="密码">
						<Input className="inputText"
						       placeholder={Util.placeholderName('密码', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="密码确认">
						<Input className="inputText"
						       placeholder={Util.placeholderName('密码确认', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="状态">
						<Radio.Group >
							<Radio value={1}>启用</Radio>
							<Radio value={2}>禁用</Radio>
						</Radio.Group>
					</Descriptions.Item>
					<Descriptions.Item label="性别">
						<Radio.Group>
							<Radio value={1}>男</Radio>
							<Radio value={2}>女</Radio>
						</Radio.Group>
					</Descriptions.Item>
					<Descriptions.Item label="离职">
						<Radio.Group >
							<Radio value={1}>是</Radio>
							<Radio value={2}>否</Radio>
						</Radio.Group>
					</Descriptions.Item>
					<Descriptions.Item label="备注">
						<Input className="inputText"
						       placeholder={Util.placeholderName('备注', "")}
						/>
					</Descriptions.Item>
				</Descriptions>
			</div>
		)
	}
	
	render() {
		const {columns, data,modalDetails} = this.state
		return (
			<div className="section-content">
				<div className="search-input">
					<Search searchType={"userPractice"} search={this.search.bind(this)}
					        searchAdd={this.openMode.bind(this, {oType: 'add'})}/>
				</div>
				<div className="search-content">
					<Table
						pagination={false}
						columns={columns}
						dataSource={data}
					/>
					<PaginationPage/>
				</div>
				<Slot
					modalDetails={modalDetails}
					afterClose={() => {
						this.onAfterClose()
					}}
					detailsSlot={this.checkModal()}
				/>
			</div>
		);
	}
}
