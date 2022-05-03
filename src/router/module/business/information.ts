import {RouteConfig} from 'react-router-config';
import Main from '@/components/main';
import CompanyList from "@/pages/business/information/company-list"
import BrandList from "@/pages/business/information/brand-list"
import UserCollect from "@/pages/business/information/collect-user"
import consultList from "@/pages/business/information/consult-list"
import ClassifiedInfo from "@/pages/business/information/classified-info"
import secondaryList from "@/pages/business/information/secondary-list"
import journalismList from "@/pages/business/information/journalism-list"

const businessName: string = "/business/information";
import {BusinessName} from "@/lib/local"

const bName = BusinessName.InformationName
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
				name: "CompanyList",
				path: `${businessName}/company-list`,
				requiresAuth: false,//是否需要登录
				permissions: ['user', 'admin'], // 当前登录权限必须 user或admin 才可以访问
				component: CompanyList,
				meta: {
					title: bName.rTitle,
				},
			},
			{
				name: "secondaryList",
				path: `${businessName}/secondary-list`,
				requiresAuth: false,//是否需要登录
				permissions: ['user', 'admin'], // 当前登录权限必须 user或admin 才可以访问
				component: secondaryList,
				meta: {
					title: bName.secondaryTitle,
				},
			},
			{
				hideInMenu: true,
				name: "BrandList",
				path: `${businessName}/brand-list`,
				component: BrandList,
				meta: {
					title: bName.infoTitle,
				},
			},
			{
				name: "UserCollect",
				path: `${businessName}/collect-user`,
				component: UserCollect,
				meta: {
					title: bName.userTitle,
				},
			},
			{
				name: "consultList",
				path: `${businessName}/consult-list`,
				component: consultList,
				meta: {
					title: bName.consultTitle,
				},
			},
			{
				name: "ClassifiedInfo",
				path: `${businessName}/classified-info`,
				component: ClassifiedInfo,
				meta: {
					title: bName.classifiedTitle,
				},
			},
			{
				name: "journalismList",
				path: `${businessName}/journalism-list`,
				component: journalismList,
				meta: {
					title: bName.journalismTitle,
				},
			},
		
		]
	}
]
