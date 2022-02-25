import React from "react";
import { Redirect,} from 'react-router-dom'
import {RouteConfig} from 'react-router-config';
import  {Business,Department} from "./module/index"
import Login  from  "@/pages/login/index"
import Util from "@/lib/util";
const routesList: RouteConfig[] = [
	{path: '/', exact: true, render: () => <Redirect to={'/login'}/>},
	{ path: "/login", exact: true, render: () => <Login />},
	...Business,
	...Department,
]
const routes = Util.buildRouters?.(routesList);

export {routes}
