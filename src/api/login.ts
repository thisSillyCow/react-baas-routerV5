import {GetAxios} from "@/lib/servers";
import {ProjectName} from "@/lib/local"
const Login = `${ProjectName}session/`;
// 期望返回data的类型
interface VerificationCode {
	code: string
	uuid: string
}
 const LoginApi = {
	// 获取验证码
	getVerificationCode: () => {
		return GetAxios<VerificationCode>(`${Login}verificationCode`);
	}
}
export  default LoginApi;
