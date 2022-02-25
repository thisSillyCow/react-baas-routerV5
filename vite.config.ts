import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'

const path = require('path')
const fs = require('fs')
// @ts-ignore
import lessToJS from 'less-vars-to-js';

const themeVariables = lessToJS(
	fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8')
)
// https://vitejs.dev/config/
// console.log('process:::env', process.argv[3])
export default defineConfig({
	base: "/",
	plugins: [
		react(
			{
				babel: {
					plugins: [
						["@babel/plugin-proposal-decorators", {legacy: true}],
						["@babel/plugin-proposal-class-properties", {loose: true}],
					],
				},
			},
		),
		vitePluginImp({
			libList: [
				{
					libName: "antd",
					style: (name) => `antd/lib/${name}/style/index.less`,
				},
			],
		})
	],
	server: {
		https: false,// 是否开启https服务
		open: true, // 是否自动在浏览器打开
		port: 3001, // 端口号
		host: "0.0.0.0",
		proxy: {
			"/baas-api": {
				// 当遇到 /api 路径时，将其转换成 target 的值，这里我们为了测试，写了新蜂商城的请求地址
				target: "https://pisabeta.innochain.tech/",
				changeOrigin: true,
				// rewrite: path => path.replace(/^\/baas-api/, '') // 将 /api 重写为空
			}
		}
	},
	define: {
		"process.env": {
			NODE_ENV: process.argv[3],
			VITE_APP_TYPE: process.argv[3] === "development" ? "dev" : "pro",
			VITE_APP_BAAS_URL: process.argv[3] === "development" ? "https://pisa.innochain.tech/abt" : "",
			VITE_APP_SOCKET_URL: process.argv[3] === "development" ? "ws://127.0.0.1:8080/innochain-baas/" : "",
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), // src 路径
			'@/api': path.resolve(__dirname, './src/api'),
			'@/assets': path.resolve(__dirname, './src/assets'),
			'@/components': path.resolve(__dirname, './src/components'),
			'@/config': path.resolve(__dirname, './src/config'),
			'@/lib': path.resolve(__dirname, './src/lib'),
			'@/hooks': path.resolve(__dirname, './src/hooks'),
			'@/pages': path.resolve(__dirname, './src/pages'),
			'@/plugins': path.resolve(__dirname, './src/plugins'),
			'@/routes': path.resolve(__dirname, './src/routes'),
			'@/store': path.resolve(__dirname, './src/reducer'),
			'@/styles': path.resolve(__dirname, './src/styles')
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				// 支持内联 JavaScript
				javascriptEnabled: true,
				// 重写 less 变量，定制样式
				modifyVars: themeVariables,
			}
		}
	},
})
