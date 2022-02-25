import {RouteConfig} from 'react-router-config';
import Main from '@/components/main';
import PanStore from "@/pages/business/commerce/pan-store"
const businessName: string = "/business/commerce";
export const Commerce: RouteConfig[] = [
	{
		name: "Commerce",
		path: businessName,
		// @ts-ignore
		component: Main,
		meta: {
			title: "商机管理",
			icon: "userManagement-icon.png",
		},
		routes: [
			{
				name:"PanStore",
				path: `${businessName}/company-list`,
				requiresAuth: false,//是否需要登录
				permissions: ['user', 'admin'], // 当前登录权限必须 user或admin 才可以访问
				component: PanStore,
				meta: {
					title: "盘店管理",
				},
			},
		]
	}
]
