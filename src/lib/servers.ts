import Axios, {AxiosResponse} from "axios";
import {AxiosResponseData} from  "@/type/lib/servers";
import Util from "@/lib/util"
const getToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDI3NTk5NjgsInVzZXJuYW1lIjoiYWRtaW4ifQ.kPqiZI5i6GCj6H0nAErWQVasogGeh4gEjx6MqBzUeXI"
const axios = Axios.create({
	timeout: 1000 * 30,
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	},
	withCredentials: true // 允许携带cookie
});
axios.interceptors.request.use((config) => {
	// 在发送请求之前做些什么
	//  if (cookie.getToken()) { config.headers['x-access-token'] = cookie.getToken(); }
	if (config.headers) {
		config.headers['x-access-token'] = getToken;
	}
	return config;
}, (error) => {
	// 对请求错误做些什么
	return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(
	res => {
		// console.log(res)
		if (res.config.responseType === 'blob') {
			let isReturnJson = res.headers && res.headers['content-type'] && res.headers['content-type'].indexOf("json") > -1;
			//后端返回错误信息
			if (isReturnJson) {
				let reader = new FileReader()
				reader.onload = function (event) {
					let content = reader.result
					if (typeof content === "string") {
						let parseRes = JSON.parse(content)
						return validateResponseCode({
							res: {
								data: parseRes
							}
						});
					} // 错误信息
				}
				reader.readAsText(res.data);
				return true
			} else {
				//下载文件
				// download(res);
			}
		} else {
			//正常json请求
			return validateResponseCode({res: res});
		}
	},
	error => {
		console.log("服务内部错误")
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);


const validateResponseCode = (parseRes: { res?: { data: any; } | AxiosResponse; data?: any; }) => {
	const  data = parseRes.res?.data;
	if (data && data.code && data.code !== 1) {
		if (data.code === 1001 || data.code === 1003) {
			// 未登录，或登录失效，请登录
			return Promise.resolve(data);
		} else {
			return Promise.resolve(data);
		}
	}
	return Promise.resolve(data);
}
export const PostAxios:AxiosResponseData = (url: string, data: object = {}) => {
	return axios.post(url, data);
};

export const GetAxios:AxiosResponseData = (url: string, data: object = {}) => {
	return axios.get(url, data);
};


