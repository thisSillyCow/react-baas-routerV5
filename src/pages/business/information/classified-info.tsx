/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/2 23:19
 * @description:分类信息
 */
import React from 'react'
import Search from "@/components/search/search";
import {Descriptions, Input, Select, Table, Upload} from "antd";
import PaginationPage from "@/components/custom/custom-pagination";
import {modalState, tData} from "@/type/page/business/information/company-list";
import {tableList} from "@/type/components/custom-function";
import TableAction from "@/components/custom/table-action";
import {classifiedState} from "@/type/page/business/information/classified-info";
import {dataTemporary} from "@/lib/temporary";
import E from "wangeditor";
import Util from "@/lib/util";
import {editorConfig, ModalInfo} from "@/lib/local";
import Slot from "@/components/slot";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
const {Option} = Select;
export default class classifiedInfo extends React.Component<any, classifiedState> {
	public constructor(props: any) {
		super(props);
		this.state = {
			editor:"close",
			editorAboutUsContent:"",
			loading:false,
			modalDetails:{
				modalVisible: false,
			},
			searchInfo: {
				cName: "",
				bName: "",
				sName: "",
			},
			companyList: [
				{id:1,companyName:"公司1"},
				{id:2,companyName:"公司2"},
				{id:3,companyName:"公司3"},
				{id:4,companyName:"公司4"},
			],
			data: dataTemporary,
			columns: [
				{title: 'Id', dataIndex: 'key', key: 'Id'},
				{title: '分类名称', dataIndex: 'name', key: 'name'},
				{title: '公司名称', dataIndex: 'name', key: 'name'},
				{title: '点赞数量', dataIndex: 'age', key: 'age'},
				{title: '收藏数量', dataIndex: 'age', key: 'age'},
				{title: '创建时间', dataIndex: 'time', key: 'time'},
				{
					title: '操作',
					dataIndex: '',
					key: 'x',
					render: (params: tData) => {
						const tableAction :Array<tableList>= [
							{
								title: "查看",
								directives: { name: "privilege", value: "brand:detail" },
								action: () => {
									console.log("查看",params)
								},
							},
							{
								title: "反馈",
								directives: { name: "privilege", value: "brand:detail" },
								action: () => {
									console.log("反馈",params)
								},
							},
						]
						return  <TableAction tableAction={tableAction}/>
					},
				},
			],
		}
	}
	
	public componentDidMount():void {
	}
	
	public  componentWillUnmount():void {
	}
	public search(e: any): void {
		// console.log(e)
	}
	public  addInformation():void{
		// this.props.history.push({pathname: "/business/information/brand-list"});
	}
	public initAboutUsEditor():void{
		const elemMenu = ".editorElem-menu";
		const elemBody = ".editorElem-body";
		const editor = new E(elemMenu,elemBody)
		// 使用 onchange 函数监听内容的变化，并实时更新到 state 中
		editor.config.onchange = (html:any) => {
			this.setState({
				editorAboutUsContent: editor.txt.html()
			})
		}
		editor.config.placeholder =  Util.placeholderName("关于我们", "");
		editor.config.menus = editorConfig.menus;
		editor.config.uploadImgShowBase64 = editorConfig.uploadImgShowBase;
		editor.create();
		this.setState({
			editor:"open",
		})
	}
	public openMode(mObj:modalState): void {
		const {editor} =this.state
		const {oType}=mObj
		let modalTitle:string = ModalInfo.MODAL_TITLE;
		let modalWidth:number = ModalInfo.MODAL_WIDTH;
		switch (oType) {
			case "add":
				modalTitle=ModalInfo.ADD_TITLE+"分类";
				modalWidth=1000;
				break;
		}
		
		const mDetails = {modalVisible:true,modalTitle,modalWidth};
		this.setState({
			modalDetails:mDetails,
		})
		if(editor === "close"){
			setTimeout(()=>this.initAboutUsEditor(),100);
		}
	}
	public onAfterClose(): void {
		const openObj = {
			modalVisible: false,
		};
		this.setState({
			modalDetails: openObj
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
	public checkModal():JSX.Element{
		const {companyList ,loading}=this.state;
		return (
			<div>
				<Descriptions bordered column={{  xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
					<Descriptions.Item label="分类名称">
						<Input  className="inputText"
						        placeholder={Util.placeholderName('分类名称', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="公司名称">
						<Select  onChange={this.handleCompany.bind(this)} allowClear
						         placeholder={Util.placeholderName("公司名称", "select")} className="inputText">
							{
								companyList.map((e,index)=> {
										return (
											<Option key={index} value={e.companyName}>{e.companyName}</Option>
										)
									}
								)
							}
						</Select>
					</Descriptions.Item>
					<Descriptions.Item label="联系电话">
						<Input  className="inputText"
						        placeholder={Util.placeholderName('联系电话', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="详细地址">
						<Input  className="inputText"
						        placeholder={Util.placeholderName('详细地址', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Banner图" span={2}>
						<div className="upload-pic">
							<div className="upload-pic-list">
								<div
									className="upload-pic-file  upload-pic-text">{Util.placeholderName("Banner图", "file")}</div>
							</div>
							<div className="upload-pic-hint">
								<span className="upload-pic-text">支持jpg、png等格式，图片尺寸700*350像素，不超过2M</span>
								<Upload
									name="avatar"
									listType="picture-card"
									className="avatar-uploader"
									showUploadList={false}
									action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
									// beforeUpload={beforeUpload}
									// onChange={this.handleChange}
								>
									<div>
										{loading ? <LoadingOutlined/> : <PlusOutlined/>}
										<div style={{marginTop: 8}}>Upload</div>
									</div>
								</Upload>
							</div>
						</div>
					</Descriptions.Item>
					<Descriptions.Item label="关于介绍" span={2}>
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
		const {columns ,data,modalDetails} =this.state
		return (
			<div className="section-content">
				<div className="search-input">
					<Search searchType={"classified"} search={this.search.bind(this)} searchAdd={this.openMode.bind(this,{oType:'add'})}/>
				</div>
				<div className="search-content">
					<Table
						pagination={false}
						columns={columns}
						dataSource={data}
					/>
					<PaginationPage />
				</div>
				<Slot
					modalDetails={modalDetails}
					afterClose={() => {this.onAfterClose()}}
					detailsSlot={this.checkModal()}
				/>
			</div>
		);
	}
}
