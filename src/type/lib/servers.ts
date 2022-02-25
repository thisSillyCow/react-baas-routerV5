import {AxiosRequestConfig, ResponseData} from "axios";
declare module 'axios' {
	// 定制业务相关的网络请求响应格式， T 是具体的接口返回类型数据
	export interface ResponseData<T> {
		code: number;
		success:boolean;
		msg?: string;
		data?: T;
	}
}
// 泛型接口
export interface AxiosResponseData {
	<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ResponseData<T>>;
}




