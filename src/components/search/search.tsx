/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/1 14:11
 * @description:  信息管理查询组建
 */
import React from 'react'
import {Input, Cascader, DatePicker, Select} from "antd";
import CustomButton from "@/components/custom/customButton";
import locale from 'antd/es/date-picker/locale/zh_CN';
import Util from "@/lib/util"
import moment from 'moment';
import {SearchList} from "@/lib/local";
import "@/styles/custom-input.less"

const {RangePicker} = DatePicker;
const {Option} = Select;

interface iFace {
	companyId: number;
	companyName: string | undefined;
	searchName: string;
	searchPhone:string;
	// @ts-ignore
	dataPicker: moment;
	defaultValue: string[] | number[];
}

interface searchProps {
	searchType: string;
	search: Function;
	searchAdd?: Function;
}
interface cList {
	id:number;
	companyName:string;
}
interface searchState {
	options: Array<object>;
	companyList: Array<cList>;
	searchName: string;
	searchInfo: iFace;
}

export default class search extends React.Component<searchProps, searchState> {
	public constructor(props: searchProps) {
		super(props);
		this.state = {
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
			companyList: [
				{id:1,companyName:"公司1"},
				{id:2,companyName:"公司2"},
				{id:3,companyName:"公司3"},
				{id:4,companyName:"公司4"},
			],
			searchName: "",
			searchInfo: {
				searchPhone:"",
				companyName: undefined,
				companyId: 0,
				searchName: "",
				dataPicker: [],
				defaultValue: [],
			},
		}
	}
	
	public componentDidMount(): void {
	
	}
	
	public componentWillUnmount(): void {
	
	}
	
	public loginVerify(event: React.ChangeEvent<HTMLInputElement>, eType: string): void {
		const {searchInfo: sInfo} = this.state
		let vType: string | undefined = "";
		switch (eType) {
			case "accounts":
				vType = "vAccount"
				sInfo.searchName = Util.verifyType(event.target.value, vType);
				break;
			case "searchPhone":
				vType = "vFigure"
				sInfo.searchPhone = Util.verifyType(event.target.value, vType);
				break;
		}
		this.setState({
			searchInfo: sInfo,
		})
	}
	
	public onChange(value: any): void {
		const {searchInfo: sInfo} = this.state
		sInfo.defaultValue = value;
		this.setState({
			searchInfo: sInfo,
		})
	}
	
	public onChangeData(date: any, dateString: any): void {
		console.log(dateString)
		const {searchInfo: sInfo} = this.state
		sInfo.dataPicker = date
		this.setState({
			searchInfo: sInfo,
		})
	}
	
	public handleCompany(value: string, option: object): void {
		const {searchInfo: sInfo} = this.state
		sInfo.companyName = value
		// @ts-ignore
		sInfo.companyId = parseInt(option?.key);
		this.setState({
			searchInfo: sInfo,
		})
	}
	
	public customSearch(): void {
		this.props.search && this.props?.search("123123132")
	}
	
	public customReset(): void {
		const sInfo = {searchName: "", defaultValue: [], dataPicker: [], companyId: 0, companyName: undefined,searchPhone:""};
		this.setState({
			searchInfo: sInfo,
		})
	}
	
	public customAdd(): void {
		this.props.searchAdd && this.props?.searchAdd()
	}
	public  searchCompanyList(): JSX.Element {
		const {searchInfo,companyList} = this.state
		return (
			<Select value={searchInfo.companyName} onChange={this.handleCompany.bind(this)} allowClear
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
		)
	}
	
	public searchCompany(): JSX.Element {
		const {searchInfo, options} = this.state;
		//公司查询列表
		return (
			<div>
				<Input value={searchInfo.searchName} className="inputText"
				       placeholder={Util.placeholderName("公司名称", "")}
				       onChange={(e) => this.loginVerify(e, "accounts")}/>
				<Cascader value={searchInfo.defaultValue} options={options} onChange={this.onChange.bind(this)}
				          placeholder={Util.placeholderName("省市", "select")} className="inputText"/>
				<RangePicker value={searchInfo.dataPicker} locale={locale} className="range-picker"
				             onChange={this.onChangeData.bind(this)} format={SearchList.dateFormatList}/>
			</div>
		)
	}
	
	public searchSecondary(): JSX.Element {
		const {searchInfo, options,} = this.state;
		//二级域名列表
		return (
			<div>
				<Input value={searchInfo.searchName} className="inputText"
				       placeholder={Util.placeholderName("二级列表名称", "")}
				       onChange={(e) => this.loginVerify(e, "accounts")}/>
				{this.searchCompanyList()}
				<Cascader value={searchInfo.defaultValue} options={options} onChange={this.onChange.bind(this)}
				          placeholder={Util.placeholderName("省市", "select")} className="inputText"/>
				<RangePicker value={searchInfo.dataPicker} locale={locale} className="range-picker"
				             onChange={this.onChangeData.bind(this)} format={SearchList.dateFormatList}/>
			</div>
		)
	}
	public  searchCollect():JSX.Element{
		//用户采集
		const {searchInfo, } = this.state;
		return (
			<div>
				<Input value={searchInfo.searchName} className="inputText"
				       placeholder={Util.placeholderName("用户昵称", "")}
				       onChange={(e) => this.loginVerify(e, "accounts")}/>
				<Input value={searchInfo.searchPhone} className="inputText"
				       placeholder={Util.placeholderName("联系方式", "")}
				       onChange={(e) => this.loginVerify(e, "searchPhone")}/>
				<RangePicker value={searchInfo.dataPicker} locale={locale} className="range-picker"
				             onChange={this.onChangeData.bind(this)} format={SearchList.dateFormatList}/>
			</div>
		)
	}
	
	public  searchClassified():JSX.Element{
		//咨询列表 分类信息 新闻列表 人员操作  用户列表
		const {searchType} = this.props
		const {searchInfo, } = this.state;
		let  name:string = "";
		if(searchType === "consult"){
			name = "咨询名称"
		}
		if(searchType === "classified"){
			name = "分类名称"
		}
		if(searchType === "journalism"){
			name = "新闻名称"
		}
		if(searchType === "userList"){
			name = "用户名称"
		}
		if(searchType === "userPractice"){
			name = "人员名称"
		}
		return (
			<div>
				<Input value={searchInfo.searchName} className="inputText"
				       placeholder={Util.placeholderName(name, "")}
				       onChange={(e) => this.loginVerify(e, "accounts")}/>
				{this.searchCompanyList()}
				<Input value={searchInfo.searchPhone} className="inputText"
				       placeholder={Util.placeholderName("联系方式", "")}
				       onChange={(e) => this.loginVerify(e, "searchPhone")}/>
				<RangePicker value={searchInfo.dataPicker} locale={locale} className="range-picker"
				             onChange={this.onChangeData.bind(this)} format={SearchList.dateFormatList}/>
			</div>
		)
	}
	render() {
		const {searchType} = this.props
		return (
			<div className="custom-input">
				{searchType === "company" && this.searchCompany()}
				{searchType === "secondary" && this.searchSecondary()}
				{searchType === "collect" && this.searchCollect()}
				{(searchType === "consult" || searchType === "classified"||searchType === "userPractice" ||searchType === "userList" ||searchType === "journalism") && this.searchClassified()}
				<CustomButton placeType="search" search={this.customSearch.bind(this)}/>
				<CustomButton placeType="reset" search={this.customReset.bind(this)}/>
				<CustomButton placeType="add" search={this.customAdd.bind(this)}/>
			</div>
		);
	}
}
