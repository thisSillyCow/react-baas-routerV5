/**
 * @Author: ZH
 * @createdTime: 2021-12-2021/12/21 10:27
 * @description:用户列表
 */

import React from 'react'
import Search from "@/components/search/search";
import {Table} from "antd";
import PaginationPage from "@/components/custom/custom-pagination";
import {tData} from "@/type/page/business/information/company-list";
import {tableList} from "@/type/components/custom-function";
import TableAction from "@/components/custom/table-action";
import {dataTemporary} from "@/lib/temporary";
import {userListState} from "@/type/page/business/user-management/user-list";

export default class index extends React.Component<any, userListState> {
	public constructor(props: any) {
		super(props);
		this.state = {
			searchInfo: {
				cName: "",
				bName: "",
				sName: "",
			},
			data: dataTemporary,
			columns: [
				{title: 'Id', dataIndex: 'key', key: 'Id'},
				{title: '用户名称', dataIndex: 'name', key: 'name'},
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
					<Search searchType={"userList"} search={this.search.bind(this)} searchAdd={this.addInformation.bind(this)}/>
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

