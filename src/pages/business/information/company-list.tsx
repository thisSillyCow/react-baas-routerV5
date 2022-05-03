import React from 'react'
import {inject} from 'mobx-react';
import {Button, Select, Table} from 'antd';

const {Option} = Select;
import PaginationPage from "@/components/custom/custom-pagination"
import Slot from "@/components/slot"
import {CompanyState, CompanyProps, tData} from "@/type/page/business/information/information"
import Alert from "@/components/alert";
import "@/styles/page/business/information/company-list.less"
import CustomButton from "@/components/custom/customButton";
import Search from "@/components/search/search"
import TableAction from "@/components/custom/table-action"
import {tableList} from "@/type/components/custom-function";

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
			seconds: 0,
			modalDetails: {
				modalVisible: false,
			},
			searchInfo: {
				cName: "",
				bName: "",
				sName: "",
			},
			data: [
				{
					key: 1,
					name: 'John Brown',
					age: 32,
					address: 'New York No. 1 Lake Park',
					description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
					state: 1,
					stateMsg: "开启",
				},
				{
					key: 2,
					name: 'Jim Green',
					age: 42,
					address: 'London No. 1 Lake Park',
					description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
					state: 2,
					stateMsg: "禁用",
				},
				{
					key: 3,
					name: 'Not Expandable',
					age: 29,
					address: 'Jiangsu No. 1 Lake Park',
					description: 'This not expandable',
					state: 2,
					stateMsg: "禁用",
				},
				{
					key: 4,
					name: 'Joe Black',
					age: 32,
					address: 'Sidney No. 1 Lake Park',
					description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
					state: 1,
					stateMsg: "开启",
				},
			],
			columns: [
				{title: 'Id', dataIndex: 'key', key: 'Id'},
				{title: '公司名称', dataIndex: 'name', key: 'name'},
				{title: '省市', dataIndex: 'age', key: 'age'},
				{title: '创建时间', dataIndex: 'address', key: 'address'},
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
	
	public changeTheme(): void {
	
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
	
	public addInformation(): void {
		// this.props.history.push({pathname: "/business/information/brand-list"});
	}
	
	render() {
		const {modalDetails, columns, data} = this.state;
		const {count} = this.props;
		return (
			<div className="section-content">
				<div className="search-input">
					<Search searchType={"company"} search={this.search.bind(this)}
					        searchAdd={this.addInformation.bind(this)}/>
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
