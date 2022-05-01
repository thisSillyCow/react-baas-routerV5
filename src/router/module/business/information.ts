import {RouteConfig} from 'react-router-config';
import Main from '@/components/main';
import CompanyList from "@/pages/business/information/company-list"
import BrandList from "@/pages/business/information/brand-list"
import  UserCollect from "@/pages/business/information/brand-list"
const businessName: string = "/business/information";
import {RouterPath,BusinessName} from "@/lib/local"
const bName = BusinessName.InformationName
const path = RouterPath.Business;
export const Information: RouteConfig[] = [
	{
		name: "Information",
		path: businessName,
		// @ts-ignore
		component: Main,
		meta: {
			title: bName.title,
			icon: "userManagement-icon.png",
		},
		routes: [
			{
				exact:true,
				name:"CompanyList",
				path: `${businessName}/company-list`,
				requiresAuth: false,//是否需要登录
				permissions: ['user', 'admin'], // 当前登录权限必须 user或admin 才可以访问
				component:CompanyList,
				meta: {
					title: bName.rTitle,
				},
			},
			{
				name:"BrandList",
				path: `${businessName}/brand-list`,
				component: BrandList,
				meta: {
					title: bName.infoTitle,
				},
			},
			{
				name:"UserCollect",
				path: `${businessName}/user-collect`,
				component: UserCollect,
				meta: {
					title: bName.userTitle,
				},
			},
			
		]
	}
]
