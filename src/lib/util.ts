import store from "@/stores/index"
import {message} from 'antd';
import {HintInfo} from "@/lib/local"
import {RouteConfig} from 'react-router-config';

const Util = {
	/**
	 * @description 存入数据
	 * @param key {string} 存入key
	 * @param value {string} 存入数据
	 */
	localSave: (key: string, value: string) => {
		localStorage.setItem(key, value);
	},
	/**
	 * @description 获取缓存的数据
	 * @param key {string} 获取缓存key
	 */
	localRead: (key: string) => {
		return localStorage.getItem(key) || "";
	},
	/**
	 * @description 修改模块路由里面的结构
	 */
	buildRouters: (routersList: RouteConfig[]): RouteConfig[] => {
		let lineRouters: RouteConfig = [];
		let getMenuList: RouteConfig[] = [];
		const menuListKeyStr = JSON.stringify(routersList)
		store.AppInfo.setMenuList(menuListKeyStr)
		for (const menuListKey of routersList) {
			const temRoutes = menuListKey.routes;
			if (temRoutes) {
				for (const temRoute of temRoutes) {
					lineRouters = lineRouters.concat(temRoute.routes);
				}
				// @ts-ignore
				menuListKey.routes = lineRouters;
			}
			getMenuList = getMenuList.concat(menuListKey)
		}
		return getMenuList;
	},
	/***
	 * @description 验证正则
	 * @param verify  {string} 输入的字符串
	 * @param vType  {string} 需要转换的类型
	 * @return 返回跟格式一样的结果
	 * */
	verifyType: (verify: string, vType: string = "") => {
		let reg = /[^a-zA-Z0-9]/g; // 英文数字
		switch (vType) {
			case "vCipher"://英文特殊字符
				reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,}$/
				break;
			case "vAccount": //中英文数字-
				reg = /[^a-zA-Z0-9-\u4e00-\u9fa5]/g;
				break;
			case "vLetter": //英文大小写
				reg = /[^a-zA-Z]/g;
				break;
			case "vFigure": //纯数字
				reg = /[^0-9]/g;
				break;
		}
		verify = verify.replace(reg, "");
		return verify;
	},
	/***
	 * @description 验证输入正则
	 * @param verify  {string} 输入的字符串
	 * @param vType  {string} 需要验证的类型
	 * @return 返回结果
	 */
	isVerify: (verify: string, vType: string = "") => {
	
	}, /***
	 * @description 公共组件信息提示框
	 * @param msg {string} 提示的文本
	 * @param mType {string} 提示框的类型
	 */
	messageMsg: (msg: string, mType: string) => {
		interface iMessage {
			[key: string]: any
		}
		
		(<iMessage>message)[mType](msg, HintInfo.duration).then();
	},
	placeholderName: (name: string,pType:string)=>{
		let placeholderStr = "请输入";
		switch (pType) {
			case "select":
				placeholderStr = "请选择";
				break;
			case "file":
				placeholderStr = "请上传";
				break;
		}
		return placeholderStr + name;
	},
	
}

export default Util;
