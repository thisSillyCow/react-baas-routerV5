/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/1 22:43
 * @description: 分页
 */
import React from 'react'
import { Pagination } from 'antd';
import "./index.less"
export default class PaginationPage extends React.Component<any, any> {
	public constructor(props: any) {
		super(props);
		this.state = {
		}
	}
	
	public componentDidMount(): void {
	
	}
	
	public componentWillUnmount(): void {
	
	}
	
	render() {
		return (
			<div className="pagination-section">
				<Pagination
					total={45}
					showSizeChanger
					// showSizeChanger
					// hideOnSinglePage={false}
					// showTotal={total => `总共： ${total} 数据`}
					// defaultPageSize={10}
					// defaultCurrent={1}
				/>
				
			</div>
		);
	}
}
