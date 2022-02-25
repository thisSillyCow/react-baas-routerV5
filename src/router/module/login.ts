import {RouteConfig} from 'react-router-config';

export const Login: RouteConfig[] = [
	{
		name: "Login",
		path: "/login",
		// @ts-ignore
		component: () => import("@/pages/login/index"),
		meta: {
			title: "用户登陆",
			icon: "userManagement-icon.png",
		},
	}
]
