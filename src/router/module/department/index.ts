/**
 * @Author: ZH
 * @createdTime: 2022-02-2022/2/21 14:57
 * @description:
 */
import Main from "@/components/main";
import {RouteConfig} from "react-router-config";
import {Employee} from "./employee"
import  {Menus} from "./menus"

export const Department: RouteConfig[] = [
	{
		name: "Department",
		path: "/department",
		// @ts-ignore
		component: Main,
		meta: {
			title: "部门管理",
			icon: "userManagement-icon.png",
		},
		routes: [
			...Employee,
			...Menus,
		],
	}
]
