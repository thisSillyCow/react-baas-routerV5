import {RouteConfig} from 'react-router-config';
import {RouterPath, BusinessName} from "@/lib/local"
import Main from '@/components/main';
import  UserList from "@/pages/business/user-management/user-list"
import  UserPractice from "@/pages/business/user-management/user-practice"
const pName = BusinessName.PersonnelName
const path = RouterPath.Business;
const personnel = `${path}/personnel`
export  const  UserManagement:RouteConfig[] = [
	{
		name: "UserManagement",
		path: "/business/user-management",
		// @ts-ignore
		component: Main,
		meta: {
			title: pName.title,
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
					title:  pName.userTitle,
					
				},
			},
			{
				name:"UserPractice",
				path: '/business/user-management/user-practice',
				// exact: true,
				requiresAuth: true,//是否需要登录
				permissions: ['user', 'admin'], // 当前登录权限必须 user或admin 才可以访问
				component:UserPractice,
				meta: {
					title:  pName.practiceTitle,
					
				},
			},
			
		]
	}
]
