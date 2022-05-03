/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/2 22:55
 * @description:采集用户信息
 */
import React from 'react'
import Search from "@/components/search/search"
import {Table} from "antd";
import PaginationPage from "@/components/custom/custom-pagination";
import {tData} from "@/type/page/business/information/information";
import {tableList} from "@/type/components/custom-function";
import TableAction from "@/components/custom/table-action";
import {collectState} from "@/type/page/business/information/collect-list";
export default class index extends React.Component<any, collectState> {
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
					age: 13532131328,
					address: 'New York No. 1 Lake Park',
					description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
				},
				{
					key: 2,
					name: 'Jim Green',
					age: 13532131328,
					address: 'London No. 1 Lake Park',
					description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
				},
				{
					key: 3,
					name: 'Not Expandable',
					age: 13532131328,
					address: 'Jiangsu No. 1 Lake Park',
					description: 'This not expandable',
				},
				{
					key: 4,
					name: 'Joe Black',
					age: 13532131328,
					address: 'Sidney No. 1 Lake Park',
					description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
				},
			],
			columns: [
				{title: 'Id', dataIndex: 'key', key: 'Id'},
				{title: '用户名', dataIndex: 'name', key: 'name'},
				{title: '联系方式', dataIndex: 'age', key: 'age'},
				{title: '采集时间', dataIndex: 'address', key: 'address'},
				{title: '备注', dataIndex: 'address', key: 'address'},
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
	
	public componentDidMount(): void {
	
	}
	
	public componentWillUnmount(): void {
	
	}
	public search(e: any): void {
		console.log(e)
	}
	public  addInformation():void{
		// this.props.history.push({pathname: "/business/information/brand-list"});
	}
	render() {
		const {columns ,data} =this.state
		return (
			<div className="section-content">
				<div className="search-input">
					<Search searchType={"collect"} search={this.search.bind(this)} searchAdd={this.addInformation.bind(this)}/>
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
