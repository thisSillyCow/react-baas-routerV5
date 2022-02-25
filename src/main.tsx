import React from 'react'
import ReactDOM from 'react-dom'
import {renderRoutes} from 'react-router-config';
import {Provider,} from 'mobx-react';
import {BrowserRouter} from 'react-router-dom';
import store from "./stores/index"
import {routes} from './router'
import 'antd/dist/antd.less'
import './index.less'
import config from "@/config";
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
				{renderRoutes(routes)}
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
