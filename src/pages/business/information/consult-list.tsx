/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/2 23:02
 * @description:咨询列表
 */
import React from 'react'
import Search from "@/components/search/search";
import {Descriptions, Input, Select, Table,} from "antd";

const {Option} = Select;
import PaginationPage from "@/components/custom/custom-pagination";
import {modalState, tData} from "@/type/page/business/information/company-list";
import {tableList} from "@/type/components/custom-function";
import TableAction from "@/components/custom/table-action";
import {consultState} from "@/type/page/business/information/consult-list";
import {dataTemporary} from "@/lib/temporary";
import Slot from "@/components/slot";
import Util from "@/lib/util";
import {editorConfig, ModalInfo} from "@/lib/local";
import E from "wangeditor";

export default class index extends React.Component<any, consultState> {
	public constructor(props: any) {
		super(props);
		this.state = {
			editor: "close",
			editorAboutUsContent: "",
			modalDetails: {
				modalVisible: false,
			},
			searchInfo: {
				cName: "",
				bName: "",
				sName: "",
			},
			companyList: [
				{id: 1, companyName: "公司1"},
				{id: 2, companyName: "公司2"},
				{id: 3, companyName: "公司3"},
				{id: 4, companyName: "公司4"},
			],
			data: dataTemporary,
			columns: [
				{title: 'Id', dataIndex: 'key', key: 'Id'},
				{title: '咨询名称', dataIndex: 'name', key: 'name'},
				{title: '公司名称', dataIndex: 'name', key: 'name'},
				{title: '联系方式', dataIndex: 'age', key: 'age'},
				{title: '创建时间', dataIndex: 'time', key: 'time'},
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
								title: "反馈",
								directives: {name: "privilege", value: "brand:detail"},
								action: () => {
									console.log("反馈", params)
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
	
	public initAboutUsEditor(): void {
		const elemMenu = ".editorElem-menu";
		const elemBody = ".editorElem-body";
		const editor = new E(elemMenu, elemBody)
		// 使用 onchange 函数监听内容的变化，并实时更新到 state 中
		editor.config.onchange = (html: any) => {
			this.setState({
				editorAboutUsContent: editor.txt.html()
			})
		}
		editor.config.placeholder = Util.placeholderName("关于我们", "");
		editor.config.menus = editorConfig.menus;
		editor.config.uploadImgShowBase64 = editorConfig.uploadImgShowBase;
		editor.create();
		this.setState({
			editor: "open",
		})
	}
	
	public openMode(mObj: modalState): void {
		const {editor} = this.state
		const {oType} = mObj
		let modalTitle: string = ModalInfo.MODAL_TITLE;
		let modalWidth: number = ModalInfo.MODAL_WIDTH;
		switch (oType) {
			case "add":
				modalTitle = ModalInfo.ADD_TITLE + "咨询";
				modalWidth = 1000;
				break;
		}
		
		const mDetails = {modalVisible: true, modalTitle, modalWidth};
		this.setState({
			modalDetails: mDetails,
		})
		if (editor === "close") {
			setTimeout(() => this.initAboutUsEditor(), 100);
		}
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
		const openObj = {
			modalVisible: false,
		};
		this.setState({
			modalDetails: openObj
		})
	}
	
	public checkModal(): JSX.Element {
		const {companyList} = this.state;
		return (
			<div>
				<Descriptions bordered column={{xl: 2, lg: 2, md: 2, sm: 2, xs: 1}}>
					<Descriptions.Item label="咨询名称">
						<Input className="inputText"
						       placeholder={Util.placeholderName('咨询名称', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="公司名称">
						<Select onChange={this.handleCompany.bind(this)} allowClear
						        placeholder={Util.placeholderName("公司名称", "select")} className="inputText">
							{
								companyList.map((e, index) => {
										return (
											<Option key={index} value={e.companyName}>{e.companyName}</Option>
										)
									}
								)
							}
						</Select>
					</Descriptions.Item>
					<Descriptions.Item label="联系电话">
						<Input className="inputText"
						       placeholder={Util.placeholderName('联系电话', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="详细地址">
						<Input className="inputText"
						       placeholder={Util.placeholderName('详细地址', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="公司介绍" span={2}>
						<div>
							<div ref="editorElemMenu" className="editorElem-menu"/>
							<div ref="editorElemBody" className="editorElem-body"/>
						</div>
					</Descriptions.Item>
				</Descriptions>
			</div>
		)
	}
	
	render() {
		const {columns, data, modalDetails} = this.state
		return (
			<div className="section-content">
				<div className="search-input">
					<Search searchType={"consult"} search={this.search.bind(this)}
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
