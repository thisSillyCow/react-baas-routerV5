import {Information} from "./information"
import {UserManagement} from "./user-management"
// import {Commerce} from "./commerce"
import Main from "@/components/main";
import {RouteConfig} from "react-router-config";
import HomePage from "@/pages/business/home";

const Home: RouteConfig[] = [
	{
		name: "Home",
		path: "business",
		// @ts-ignore
		component: Main,
		hideInMenu: false,
		meta: {
			title: "首页",
			icon: "userManagement-icon.png",
		},
		routes: [
			{
				name: "HomePage",
				path: `/business/home`,
				requiresAuth: false,//是否需要登录
				component: HomePage,
				meta: {
					title: "首页",
				},
			},
		]
	}
]

export const Business: RouteConfig[] = [
	{
		name: "Business",
		path: "/business",
		// @ts-ignore
		component: Main,
		meta: {
			title: "业务管理",
			icon: "userManagement-icon.png",
		},
		routes: [
			// ...Home,
			...Information,
			...UserManagement,
			// ...Commerce,
		],
	}
]
