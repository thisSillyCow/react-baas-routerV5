import React from 'react'
import ReactDOM from 'react-dom'
import {renderRoutes} from 'react-router-config';
import {Provider,} from 'mobx-react';
import { ConfigProvider } from 'antd';
import {BrowserRouter,} from 'react-router-dom';
import store from "./stores/index"
import {routes} from './router'
import 'antd/dist/antd.less'
import './index.less'
import config from "@/config";
import zhCN from 'antd/lib/locale/zh_CN'
ReactDOM.render(
	<Provider store={store} >
		<BrowserRouter >
			<ConfigProvider locale={zhCN}>
			{renderRoutes(routes)}
			</ConfigProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
