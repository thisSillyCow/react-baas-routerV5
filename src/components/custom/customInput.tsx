/**
 * @Author: ZH
 * @createdTime: 2022-01-2022/1/12 17:06
 * @description: 输入框组件
 */
import React from 'react'
import {Input, Select} from 'antd';
import emitter from "@/lib/events"
import EventEmitter from "events";
import {withRouter} from 'react-router-dom'
import {InputProps, InputState, rSearch} from "@/type/components/customInput"
import {EventReset, EventSearch, UserVerify} from "@/lib/local"
import {companyList} from "@/lib/temporary"

import Util from "@/lib/util"
import "./index.less"

const {Option} = Select;

class CustomInput extends React.Component<InputProps, InputState> {
	public eventEmitter: EventEmitter | undefined;
	
	public constructor(props: InputProps) {
		super(props);
		this.state = {
			pathName: "",
			bordered: false,
			searchValue: "",
		};
	}
	
	public componentDidMount(): void {
		const pathname = this.props.location.pathname
		if (!this.eventEmitter) {
			this.eventEmitter = emitter.addListener(EventReset, this.disposeReset);
			
		}
		this.setState({
			pathName: pathname
		})
	}
	
	public componentWillUnmount(): void {
		this.eventEmitter && emitter.removeListener(EventReset, this.disposeReset);
	}
	
	public placeholderMsg(): string {
		let msg: string;
		const pleaseInput: string[] = ["text",];
		const {placeMsg, placeType} = this.props
		if (pleaseInput.indexOf(placeType) >= 0) {
			msg = `请输入${placeMsg}`
		} else {
			msg = `请选择${placeMsg}`
		}
		return msg;
	}
	
	public loginVerify(event: React.ChangeEvent<HTMLInputElement>, eType: string): void {
		let vType: string | undefined = "";
		console.log(this.state)
		switch (eType) {
			case "accounts":
				vType = "vAccount"
				break;
		}
		let searchName: string = Util.verifyType(event.target.value, vType);
		this.setState({
			searchValue: searchName
		})
		
		this.valueListener(searchName)
	}
	
	public valueListener(vMsg: string): void {
		const sValue = this.props?.sValue;
		const pathname = this.props.location.pathname;
		const param = {sMsg: vMsg, pathname, sValue}
		emitter?.emit(EventSearch, JSON.stringify(param))
	}
	
	public disposeReset(rMsg: string): void {
		const rEvent: rSearch = JSON.parse(rMsg)
		const {pathName,} = this.state
		const pName = rEvent?.pathName;
		const sMsg = rEvent?.sMsg;
		if (pathName === pName && sMsg === "reset") {
			this.setState({searchValue: ""})
		}
	}
	
	public onChange(value: number): void {
		console.log(`selected ${value}`);
	}
	
	render() {
		const {searchValue} = this.state
		const {placeType,} = this.props
		console.log("searchValue: "+searchValue)
		return (
			<div className="custom-input">
				{placeType === "text" &&
                    <Input value={searchValue} placeholder={this.placeholderMsg()} maxLength={UserVerify.name}
                           onChange={(e) => this.loginVerify(e, "accounts")}
                           className="inputText"/>}
				{placeType === "select" &&
                    <Select
                        showSearch allowClear
                        placeholder={this.placeholderMsg()}
                        optionFilterProp="children" className="inputText"
                        onChange={this.onChange}
                        filterOption={(input, option) =>
							option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
                    >
						{
							companyList.map((item, index) => {
								return <Option label={item} value={item.id} key={index}>{item.companyName}</Option>
							})
						}
                    </Select>
				}
			</div>
		);
	}
}

export default withRouter(CustomInput);
