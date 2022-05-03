/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/2 23:02
 * @description:咨询列表
 */
import React from 'react'
import Search from "@/components/search/search";
import {Table} from "antd";
import PaginationPage from "@/components/custom/custom-pagination";
import {tData} from "@/type/page/business/information/information";
import {tableList} from "@/type/components/custom-function";
import TableAction from "@/components/custom/table-action";
import {consultState} from "@/type/page/business/information/consult-list";

export default class index extends React.Component<any, consultState> {
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
					time:"2022-5-3 19：01：35",
					address: 'New York No. 1 Lake Park',
					description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
				},
				{
					key: 2,
					name: 'Jim Green',
					age: 13532131328,
					time:"2022-5-3 19：01：35",
					address: 'London No. 1 Lake Park',
					description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
				},
				{
					key: 3,
					name: 'Not Expandable',
					age: 13532131328,
					time:"2022-5-3 19：01：35",
					address: 'Jiangsu No. 1 Lake Park',
					description: 'This not expandable',
				},
				{
					key: 4,
					age: 13532131328,
					name: 'Joe Black',
					time:"2022-5-3 19：01：35",
					address: 'Sidney No. 1 Lake Park',
					description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
				},
			],
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
		// this.props.history.push({pathname: "/business/information/brand-list"});
	}
	render() {
		const {columns ,data} =this.state
		return (
			<div className="section-content">
				<div className="search-input">
					<Search searchType={"consult"} search={this.search.bind(this)} searchAdd={this.addInformation.bind(this)}/>
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
