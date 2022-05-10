import React from 'react'
import ReactDOM from 'react-dom'
import {renderRoutes} from 'react-router-config';
import {Provider,} from 'mobx-react';
import {ConfigProvider} from 'antd';
import {HashRouter,} from 'react-router-dom';
import store from "./stores/index"
import {routes} from './router'
import 'antd/dist/antd.less'
import './index.less'
import config from "@/config";
import zhCN from 'antd/lib/locale/zh_CN'

ReactDOM.render(
	<Provider >
		<HashRouter>
			<ConfigProvider locale={zhCN}>
				{renderRoutes(routes)}
			</ConfigProvider>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
