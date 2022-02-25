/**
 * @Author: ZH
 * @createdTime: 2022-01-2022/1/14 15:05
 * @description:按钮框架
 */

import React from 'react'
import {Input, Button} from 'antd';
import {SearchOutlined, DownloadOutlined, SyncOutlined} from '@ant-design/icons';
import emitter from "@/lib/events"
import EventEmitter from "events";
import {withRouter} from 'react-router-dom'
import {ButtonProps, dSearch, ButtonState, } from "@/type/components/customInput"
import {EventReset, } from "@/lib/local"
import "./index.less"

class CustomButton extends React.Component<ButtonProps, ButtonState> {
	public eventEmitter: EventEmitter | undefined;
	public constructor(props: ButtonProps) {
		super(props);
		this.state = {
			pathName: "",
			searchInfo: {},
		};
	}
	
	public componentDidMount(): void {
		const pathname = this.props.location.pathname
		if(!this.eventEmitter){
			this.eventEmitter = emitter.addListener(EventReset,this.disposeReset );
		}
		this.setState({
			pathName: pathname
		})
	}
	
	public componentWillUnmount(): void {
		this.eventEmitter && emitter?.removeListener(EventReset,this.disposeReset);
	}
	public disposeReset(rMsg:string): void {
		const {pathName, searchInfo: sInfo} = this.state
		const sObj:dSearch = JSON.parse(rMsg)
		const pName = sObj?.pathname;
		if (pathName === pName) {
			const sMsg = sObj?.sMsg;
			const sValue = sObj?.sValue;
			// @ts-ignore
			sInfo[sValue] = sMsg;
		}
		this.setState({searchInfo: sInfo})
	}
	
	public search(): void {
		this.props.search && this.props?.search(this.state.searchInfo)
	}
	
	public resetSearch(): void {
		const {pathName,} = this.state
		const param = {sMsg: "reset", pathName}
		emitter?.emit(EventReset, JSON.stringify(param))
	}
	
	public openDownload(): void {
	
	}
	
	render() {
		const {placeType,} = this.props
		return (
			<div className="custom-input">
				{placeType === "search" &&
                    <Button type="primary" icon={<SearchOutlined/>} onClick={this.search.bind(this)}>查询</Button>}
				{placeType === "reset" &&
                    <Button icon={<SyncOutlined/>} onClick={this.resetSearch.bind(this)}>重置</Button>}
				{placeType === "download" && <Button type="primary" danger icon={<DownloadOutlined/>}
                                                     onClick={this.openDownload.bind(this)}>导出</Button>}
			</div>
		);
	}
}

export default withRouter(CustomButton);
