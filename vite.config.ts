import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import compressPlugin from "vite-plugin-compression"; //静态资源压缩
import legacyPlugin from '@vitejs/plugin-legacy'; //浏览器兼容
import vitePluginZipDist from "vite-plugin-dist-zip";
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
	// esbuild: {
	// 	jsxInject: `import React from 'react'`
	// },
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
		}),
		compressPlugin({ //gzip静态资源压缩
			verbose: true,    // 默认即可
			disable: false,  //开启压缩(不禁用)，默认即可
			deleteOriginFile: false, //删除源文件
			threshold: 10240, //压缩前最小文件大小
			algorithm: 'gzip',  //压缩算法
			ext: '.gz', //文件类型
		}),
		legacyPlugin({
			targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
		}),
		vitePluginZipDist(),
	],
	esbuild: {
		jsxFactory: 'h',
		jsxFragment: 'Fragment'
	},
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
	// 打包配置
	build: {
		// 清除console和debugger
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		//警报门槛，限制大文件大小
		// chunkSizeWarningLimit: 1500,
		rollupOptions: {
			output: {
				//对静态文件进行打包处理（文件分类）
				//此处打开后会导致背景图路径有问题，所以暂时隐藏，未找到合适的解决方案
				// chunkFileNames: 'assets/js/[name]-[hash].js',
				// entryFileNames: 'assets/js/[name]-[hash].js',
				// assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
			}
		},
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
