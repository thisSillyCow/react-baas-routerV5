/**
 * @Author: ZH
 * @createdTime: 2022-02-2022/2/21 14:56
 * @description:
 */
import {RouteConfig} from 'react-router-config';
import Main from '@/components/main';
import MenusList from "@/pages/department/menu/menus-list"

const menuName = "/department/menu/";
export const Menus: RouteConfig[] = [
	{
		name: "MenuName",
		path: "/department/menu",
		// @ts-ignore
		component: Main,
		meta: {
			title: "菜单管理",
			icon: "userManagement-icon.png",
		},
		routes: [
			{
				name: "MenusList",
				path: `${menuName}menus-list`,
				// exact: true,
				requiresAuth: true,//是否需要登录
				permissions: ['user', 'admin'], // 当前登录权限必须 user或admin 才可以访问
				component: MenusList,
				meta: {
					title: "菜单列表",
				},
			},
		
		]
	}
]
