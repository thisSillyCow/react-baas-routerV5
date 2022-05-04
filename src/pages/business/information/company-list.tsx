import React from 'react'
import {inject} from 'mobx-react';
import {Button, Select, Table, Descriptions, Input, Cascader, Upload} from 'antd';

const {Option} = Select;
import PaginationPage from "@/components/custom/custom-pagination"
import Slot from "@/components/slot"
import {CompanyState, CompanyProps, tData, modalState} from "@/type/page/business/information/company-list"
import Alert from "@/components/alert";
import "@/styles/page/business/information/company-list.less"
import CustomButton from "@/components/custom/customButton";
import Search from "@/components/search/search"
import TableAction from "@/components/custom/table-action"
import {tableList} from "@/type/components/custom-function";
import {dataTemporary} from "@/lib/temporary";
import {editorConfig, ModalInfo} from "@/lib/local";
import Util from "@/lib/util";
import E from "wangeditor";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
@inject(({store}) => (
	{
		count: store.count,
		increase: store.increase,
	}
))
export default class index extends React.Component<CompanyProps, CompanyState> {
	constructor(props: CompanyProps) {
		super(props);
		this.state = {
			loading:false,
			seconds: 0,
			editorAboutUsContent: "",
			options: [
				{
					value: 'guangdong',
					label: '广东省',
					children: [
						{
							value: 'shenzhen',
							label: '深圳市',
						},
						{
							value: '东莞',
							label: '东莞市',
							
						},
					],
				},
			],
			modalDetails: {
				modalVisible: false,
			},
			searchInfo: {
				cName: "",
				bName: "",
				sName: "",
			},
			data: dataTemporary,
			columns: [
				{title: 'Id', dataIndex: 'key', key: 'Id'},
				{title: '公司名称', dataIndex: 'name', key: 'name'},
				{title: '省市', dataIndex: 'age', key: 'age'},
				{title: '创建时间', dataIndex: 'time', key: 'address'},
				{title: '状态', dataIndex: 'stateMsg', key: 'stateMsg'},
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
									console.log("查看")
								},
							},
							{
								title: "修改",
								directives: {name: "privilege", value: "brand:detail"},
								action: () => {
									console.log("修改")
								},
							},
							{
								title: "启用",
								directives: {name: "privilege", value: "brand:detail"},
								action: () => {
									console.log("启用")
								},
							},
							{
								title: "删除",
								directives: {name: "privilege", value: "brand:detail"},
								action: () => {
									console.log("删除")
								},
							},
						]
						return <TableAction tableAction={tableAction}/>
					},
				},
			],
		};
	}
	
	public open(): void {
		// console.log(this.props)
		// this.props.history.push({pathname: "/business/brand-list"});
		// Alert.open({
		// 	alertTip:"这是一个测试弹框",
		// 	closeAlert:function(){
		// 		console.log("关闭了...");
		// 	}
		// });
	}
	
	public componentDidMount(): void {
	
	}
	
	public componentWillUnmount(): void {
		// console.warn("componentWillUnmount")
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
		editor.create()
	}
	
	
	public search(e: any): void {
		// console.log(e)
	}
	
	public onIncrease(): void {
		this.props?.increase();
	}
	
	public openMode(): void {
		this.setState({
			modalDetails: {
				modalVisible: true,
			},
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
	
	public openModal(mObj:modalState): void {
		const {oType}=mObj
		let modalTitle:string = ModalInfo.MODAL_TITLE;
		let modalWidth:number = ModalInfo.MODAL_WIDTH;
		switch (oType) {
			case "add":
				modalTitle=ModalInfo.ADD_TITLE+"公司";
				modalWidth=1000;
				break;
		}
		
		const mDetails = {modalVisible:true,modalTitle,modalWidth};
		this.setState({
			modalDetails:mDetails,
		})
		setTimeout(()=>this.initAboutUsEditor(),100);
		// this.props.history.push({pathname: "/business/information/brand-list"});
	}
	public checkModal():JSX.Element{
		const {options ,loading}=this.state;
		return (
			<div>
				<Descriptions bordered column={{  xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
					<Descriptions.Item label="公司名称">
						<Input  className="inputText"
						        placeholder={Util.placeholderName('公司名称', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="联系电话">
						<Input  className="inputText"
						        placeholder={Util.placeholderName('联系电话', "")}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="省市区">
						<Cascader  options={options}
						           placeholder={Util.placeholderName("省市", "select")} className="inputText"/>
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
					{/*<Descriptions.Item label="营业执照" span={2}><div className="upload-pic">
						<div className="upload-pic-list">
							<div
								className="upload-pic-file  upload-pic-text">{Util.placeholderName("营业执照", "file")}</div>
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
					</Descriptions.Item>*/}
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
	render () {
		const {modalDetails, columns, data ,} = this.state;
		const {count} = this.props;
		return (
			<div className="section-content">
				<div className="search-input">
					<Search searchType={"company"} search={this.search.bind(this)}
					        searchAdd={this.openModal.bind(this,{oType:'add'})}/>
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
					afterClose={() => {this.onAfterClose()}}
					detailsSlot={this.checkModal()}
				/>
			</div>
		);
	}
}
