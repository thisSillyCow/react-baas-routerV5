import {RouteConfig} from 'react-router-config';
import Main from '@/components/main';
import CompanyList from "@/pages/business/information/company-list"
import BrandList from "@/pages/business/information/brand-list"
const businessName: string = "/business/information";
export const Information: RouteConfig[] = [
	{
		name: "Information",
		path: businessName,
		// @ts-ignore
		component: Main,
		meta: {
			title: "信息管理",
			icon: "userManagement-icon.png",
		},
		routes: [
			{
				exact:true,
				name:"CompanyList",
				path: `${businessName}/company-list`,
				requiresAuth: false,//是否需要登录
				meta: {
					title: "公司管理",
				},
				permissions: ['user', 'admin'], // 当前登录权限必须 user或admin 才可以访问
				component:CompanyList,
			},
			{
				name:"BrandList",
				path: `${businessName}/brand-list`,
				component: BrandList,
				meta: {
					title: "品牌管理",
				},
			},
			
		]
	}
]
