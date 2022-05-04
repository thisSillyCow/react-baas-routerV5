import {COMPANY_INFO, HINT_INFO, USER_VERIFY, APP_MODEL_NAME, BUSINESS_NAME} from "@/type/lib/local";

export const EventSearch: string = "searchMsg";
export const EventReset: string = "resetMsg";
export const ProjectName: string = "/baas-api/";
export const CompanyInfo: COMPANY_INFO = {
	name: "深圳创链数据科技有限公司",
	encoding: "Copyright © www.innochain.tech, All Rights Reserved.",
}
export const SearchList = {
	dateFormatList: ['YYYY-MM-DD', 'YYYY-MM-DD']
}
export const HintInfo: HINT_INFO = {
	duration: 3,
}
export const UserVerify: USER_VERIFY = {
	pwd: 10,
	minPwd: 2,
	name: 20,
	minName: 2,
	code: 5,
}

export const AppModelName: APP_MODEL_NAME = {
	tabsName: "tabsMeta",
	titleName: "tabsTitle",
	sideSelected: "sideSelect",
}


export enum ModalInfo {
	CANCEL_NAME = "取消",
	CONFIRM_NAME = "确定",
	MODAL_TITLE = "温馨提示",
	ADD_TITLE = "新增",
MODAL_WIDTH=520,
}

export const BusinessName: BUSINESS_NAME = {
	InformationName: {
		title: "信息管理",
		secondaryTitle: "二级列表",
		rTitle: "公司列表",
		infoTitle: "信息发布",
		userTitle: "用户信息列表",
		consultTitle: "咨询列表",
		classifiedTitle: "分类信息",
		journalismTitle: "新闻列表",
	},
	PersonnelName: {
		title: "人员管理",
		userTitle: "用户列表",
		practiceTitle: "人员操作",
	},
}

export const GridNumber = {
	sm: 24,
	md: 12,
	lg: 10,
	xl: 8,
	xxl: 6,
};
export const editorConfig = {
	menus: [
		'head',  // 标题
		'bold',  // 粗体
		'fontSize',  // 字号
		'fontName',  // 字体
		'italic',  // 斜体
		'underline',  // 下划线
		'strikeThrough',  // 删除线
		'foreColor',  // 文字颜色
		'backColor',  // 背景颜色
		'link',  // 插入链接
		'list',  // 列表
		'justify',  // 对齐方式
		'quote',  // 引用
		'emoticon',  // 表情
		'image',  // 插入图片
		'table',  // 表格
		'video',  // 插入视频
		'code',  // 插入代码
		'undo',  // 撤销
		'redo'  // 重复
	],
	uploadImgShowBase: true,
}
