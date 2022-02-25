/**
 * @Author: ZH
 * @createdTime: 2022-02-2022/2/21 14:57
 * @description:
 */
import {RouteConfig} from 'react-router-config';
import Main from '@/components/main';
import User from "@/pages/department/employee/user"
import MyDepartment from "@/pages/department/employee/my-department"
import Role from "@/pages/department/employee/role"

const employeeName: string = "/department/employee";
export const Employee: RouteConfig[] = [
	{
		name: "Employee",
		path: employeeName,
		// @ts-ignore
		component: Main,
		meta: {
			title: "人员管理",
			icon: "userManagement-icon.png",
		},
		routes: [
			{
				name: "User",
				path: `${employeeName}/user`,
				requiresAuth: false,//是否需要登录
				permissions: ['user', 'admin'], // 当前登录权限必须 user或admin 才可以访问
				component: User,
				meta: {
					title: "用户管理",
				},
			},
			{
				name: "Role",
				path: `${employeeName}/role`,
				requiresAuth: false,//是否需要登录
				permissions: ['user', 'admin'], // 当前登录权限必须 user或admin 才可以访问
				component: Role,
				meta: {
					title: "角色管理",
				},
			},
			{
				name: "MyDepartment",
				path: `${employeeName}/my-department`,
				requiresAuth: false,//是否需要登录
				permissions: ['user', 'admin'], // 当前登录权限必须 user或admin 才可以访问
				component: MyDepartment,
				meta: {
					title: "我的部门",
				},
			},
		]
	}
]
