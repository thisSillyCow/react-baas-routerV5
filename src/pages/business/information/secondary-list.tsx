/**
 * @Author: ZH
 * @createdTime: 2021-12-2021/12/21 10:27
 * @description:二级用户列表
 */

import React from 'react'
import Search from "@/components/search/search";
import {Table} from "antd";
import PaginationPage from "@/components/custom/custom-pagination";
import {tData} from "@/type/page/business/information/information";
import {tableList} from "@/type/components/custom-function";
import TableAction from "@/components/custom/table-action";
import {secondaryState} from "@/type/page/business/information/secondary-list";

export default class index extends React.Component<any, secondaryState> {
	public constructor(props: any) {
		super(props);
		this.state = {
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
					state:1,
					stateMsg:"开启",
				},
				{
					key: 2,
					name: 'Jim Green',
					age: 42,
					address: 'London No. 1 Lake Park',
					description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
					state:2,
					stateMsg:"禁用",
				},
				{
					key: 3,
					name: 'Not Expandable',
					age: 29,
					address: 'Jiangsu No. 1 Lake Park',
					description: 'This not expandable',
					state:2,
					stateMsg:"禁用",
				},
				{
					key: 4,
					name: 'Joe Black',
					age: 32,
					address: 'Sidney No. 1 Lake Park',
					description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
					state:1,
					stateMsg:"开启",
				},
			],
			columns: [
				{title: 'Id', dataIndex: 'key', key: 'Id'},
				{title: '二级列表名称', dataIndex: 'name', key: 'name'},
				{title: '公司名称', dataIndex: 'name', key: 'name'},
				{title: '联系方式', dataIndex: 'age', key: 'age'},
				{title: '创建时间', dataIndex: 'address', key: 'address'},
				{title: '状态', dataIndex: 'stateMsg', key: 'stateMsg'},
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
									console.log("查看")
								},
							},
							{
								title: "反馈",
								directives: { name: "privilege", value: "brand:detail" },
								action: () => {
									console.log("反馈")
								},
							},
						]
						return  <TableAction tableAction={tableAction}/>
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
	public  addInformation():void{
		this.props.history.push({pathname: "/business/information/brand-list"});
	}
	render() {
		const {columns ,data} =this.state
		return (
			<div className="section-content">
				<div className="search-input">
					<Search searchType={"secondary"} search={this.search.bind(this)} searchAdd={this.addInformation.bind(this)}/>
				</div>
				<div className="search-content">
					<Table
						pagination={false}
						columns={columns}
						dataSource={data}
					/>
					<PaginationPage />
				</div>
			</div>
		);
	}
}

