/**
 * @Author: ZH
 * @createdTime: 2022-05-2022/5/2 12:50
 * @description:
 */
import React from 'react'
import { Upload, Input, Cascader, Descriptions} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {BrandProps, BrandState} from "@/type/page/business/information/brand-list";
import "@/styles/page/business/information/brand-list.less"
import Util from "@/lib/util";
import E from "wangeditor";
import {editorConfig} from "@/lib/local";
class SingleValueType {
}

export default class BrandList extends React.Component<BrandProps, BrandState> {
	public constructor(props: BrandProps) {
		super(props);
		this.state = {
			editorContent:"",
			editorAboutUsContent: "",
			loading: false,
			options: [],
			createInfo: {
				defaultValue: [],
			},
		};
	}
	
	public componentDidMount(): void {
		this.initAboutUsEditor();
		this.initBusinessesEditor();
	}
	
	public initAboutUsEditor():void{
		const elemMenu = ".editorElem-menu";
		const elemBody = ".editorElem-body";
		const editor = new E(elemMenu,elemBody)
		// 使用 onchange 函数监听内容的变化，并实时更新到 state 中
		editor.config.onchange = (html:any) => {
			this.setState({
				editorAboutUsContent: editor.txt.html()
			})
		}
		editor.config.placeholder =  Util.placeholderName("关于我们", "");
		editor.config.menus = editorConfig.menus;
		editor.config.uploadImgShowBase64 = editorConfig.uploadImgShowBase;
		editor.create()
	}
	public initBusinessesEditor():void{
		const elemMenu = ".editorBusinesses-menu";
		const elemBody = ".editorBusinesses-body";
		const editor = new E(elemMenu,elemBody)
		// 使用 onchange 函数监听内容的变化，并实时更新到 state 中
		editor.config.placeholder =  Util.placeholderName("商家介绍", "");
		editor.config.onchange = (html:any) => {
			this.setState({
				editorContent: editor.txt.html()
			})
		}
		editor.config.menus = editorConfig.menus;
		editor.config.uploadImgShowBase64 = editorConfig.uploadImgShowBase;
		editor.create()
	}
	public onChange(value: SingleValueType & SingleValueType[]): void {
		const {createInfo: cInfo} = this.state
		// @ts-ignore
		cInfo.defaultValue = value;
		this.setState({
			createInfo: cInfo,
		})
	}
	
	render() {
		const {createInfo, options, loading} = this.state
		return (
			<div className="brand-section">
				<Descriptions
					bordered
					column={3}
					title="发布二级域名信息"
				>
					<Descriptions.Item label="公司名称">
						<Input placeholder={Util.placeholderName("公司名称", "")}/>
					</Descriptions.Item>
					<Descriptions.Item label="二级名称"><Input
						placeholder={Util.placeholderName("二级名称", "")}/>
					</Descriptions.Item>
					<Descriptions.Item label="省市">
						<Cascader value={createInfo.defaultValue} options={options}
						          onChange={this.onChange.bind(this)}
						          placeholder={Util.placeholderName("省市", "select")}/>
					</Descriptions.Item>
					<Descriptions.Item label="联系方式">
						<Input placeholder={Util.placeholderName("联系方式", "")}/>
					</Descriptions.Item>
					<Descriptions.Item label="联系地址" span={2}>
						<Input placeholder={Util.placeholderName("联系地址", "")}/>
					</Descriptions.Item>
					<Descriptions.Item label="封面图" span={3}>
						<div className="upload-pic">
							<div className="upload-pic-list">
								<div
									className="upload-pic-file  upload-pic-text">{Util.placeholderName("封面图", "file")}</div>
							</div>
							<div className="upload-pic-hint">
								<span className="upload-pic-text">支持jpg、png等格式，图片尺寸700*350像素，不超过2M</span>
								<Upload
									name="avatar"
									listType="picture-card"
									className="avatar-uploader"
									showUploadList={false}
									action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
									// beforeUpload={beforeUpload}
									// onChange={this.handleChange}
								>
									<div>
										{loading ? <LoadingOutlined/> : <PlusOutlined/>}
										<div style={{marginTop: 8}}>Upload</div>
									</div>
								</Upload>
							</div>
						</div>
					</Descriptions.Item>
					<Descriptions.Item label="关于我们" span={3}>
						<div>
							<div ref="editorElemMenu" className="editorElem-menu"/>
							<div ref="editorElemBody" className="editorElem-body"/>
						</div>
					</Descriptions.Item>
					<Descriptions.Item label="商家介绍" span={3}>
						<div>
							<div ref="editorBusinessesMenu" className="editorBusinesses-menu"/>
							<div ref="editorBusinessesBody" className="editorBusinesses-body"/>
						</div>
					</Descriptions.Item>
				</Descriptions>
				<div className="submit-info">
					 <div className="submit-brand">提交</div>
				</div>
			</div>
		);
	}
}
