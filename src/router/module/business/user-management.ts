import {RouteConfig} from 'react-router-config';
import Main from '@/components/main';
import  UserList from "@/pages/business/user-management/user-list"
export  const  UserManagement:RouteConfig[] = [
	{
		name: "UserManagement",
		path: "/business/user-management",
		// @ts-ignore
		component: Main,
		meta: {
			title: "用户管理",
			icon: "userManagement-icon.png",
		},
		routes: [
			{
				name:"UserList",
				path: '/business/user-management/user-list',
				// exact: true,
				requiresAuth: true,//是否需要登录
				permissions: ['user', 'admin'], // 当前登录权限必须 user或admin 才可以访问
				component:UserList,
				meta: {
					title: "用户列表",
					
				},
			},
			
		]
	}
]
