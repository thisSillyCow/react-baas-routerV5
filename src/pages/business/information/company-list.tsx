import React from 'react'
import {inject} from 'mobx-react';
import {Button, Select} from 'antd';
const {Option} = Select;
import CustomInput from "@/components/custom/customInput"
import Slot from "@/components/slot"
import {CompanyState, CompanyProps} from "@/type/page/business/information"
import Alert from "@/components/alert";
import "./companyList.less"
import CustomButton from "@/components/custom/customButton";
import {companyList} from "@/lib/temporary";

@inject(({store}) => (
	{
		count: store.count,
		increase: store.increase,
	}
))
export default class CompanyList extends React.Component<CompanyProps, CompanyState> {
	constructor(props: CompanyProps) {
		super(props);
		this.state = {
			seconds: 0,
			modalDetails: {
				modalVisible: false,
			},
			searchInfo: {
				cName: "",
				bName: "",
				sName: "",
			},
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
	
	public changeTheme(): void {
	
	}
	
	public search(e: any): void {
		// console.log(this.props)
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
	
	render() {
		const {searchInfo: {cName, bName, sName}, modalDetails} = this.state;
		const {count} = this.props;
		return (
			
				<div className="section-content">
					<div className="search-input">
						<CustomInput sValue="cName" placeMsg="公司名称" placeType="text"/>
						<CustomInput sValue="bName" placeMsg="品牌名称" placeType="select"/>
						<CustomInput sValue="sName" placeMsg="门店名称" placeType="text"/>
						<CustomButton placeType="search" search={this.search.bind(this)}/>
						<CustomButton placeType="reset"/>
						<CustomButton placeType="download"/>
					</div>
					
					<div className="search-content">
						<input/>
						<div>CompanyList</div>
						<Button type="primary" onClick={this.open.bind(this)}>Button</Button>
						<span>{count}</span>
						<button onClick={this.onIncrease.bind(this)}>increase</button>
						<button onClick={this.changeTheme.bind(this)}>change theme</button>
						<div onClick={() => this.openMode()}>打开</div>
					</div>
					<Slot
						modalDetails={modalDetails}
						afterClose={() => {
							this.onAfterClose()
						}}
						detailsSlot={
							<div>
								<div>left</div>
								<div>left</div>
								<div>left</div>
								<div>left</div>
							</div>
						}
					/>
				</div>
		);
	}
}
