import React, {ReactNode} from 'react'
import {Input,Button} from 'antd';
import "./index.less"
import LoginFooterPic from "@/assets/images/login-footer.png"
import LoginUserPic from "@/assets/images/login-user.png"
import LogoHeadPic from "@/assets/images/logo_head.png"
import {CompanyInfo, UserVerify} from "@/lib/local"
import LoginApi from "@/api/login"
import {LoginState} from "@/type/page/login"
import Util from "@/lib/util"
import { withRouter } from 'react-router-dom'
class Login extends React.Component<any, LoginState> {
	public constructor(props: any) {
		super(props);
		this.state = {
			loginPwd: "",
			accounts: "",
			code: "",
			loading:false,
			vCode:"",
		};
	}
	public  componentDidMount():void{
		this.verificationCode().then();
	}


	public async verificationCode(): Promise<void> {
		const getRes= await LoginApi.getVerificationCode();
		if(getRes.data){
			const getData = getRes.data;
			this.setState({
				vCode:getData.code
			})
		}
	}
	public loginVerify(event: React.ChangeEvent<HTMLInputElement>, eType: string): void {
		const getValue = event.target.value;
		const regType = eType === "pwd" ? "vCipher" : "";
		const rValue = Util.verifyType(getValue, regType);
		switch (eType) {
			case "accounts":
				this.setState({
					accounts: rValue,
				})
				break;
			case "pwd":
				this.setState({
					loginPwd: rValue,
				})
				break;
			case "code":
				this.setState({
					code: rValue,
				})
				break;
		}
	}
	public login():void{
		let {loading} = this.state
		this.setState({
			loading:!loading,
		})
		this.props.history.push({pathname: "/business/home"});
	}
	public LoginPage(): ReactNode {
		let {loginPwd, accounts, code,loading,vCode,} = this.state
		return (
			<div className="user-login">
				<img src={LogoHeadPic} className="logo-head" alt=""/>
				<div className="login-info">
					<div className="login-info-list">
						<span className="account-name">帐号：</span>
						<Input bordered={false} maxLength={UserVerify.name} placeholder="请输入您的账号"
						       className="account-info" onChange={(e) => this.loginVerify(e, "accounts")}
						       value={accounts}/>
					</div>
					<div className="login-info-list">
						<span className="account-name">密码：</span>
						<Input bordered={false} maxLength={UserVerify.pwd} placeholder="请输入您的密码"
						       className="account-info" type="password" onChange={(e) => this.loginVerify(e, "pwd")}
						       value={loginPwd}/>
					</div>
					<div className="login-info-list">
						<span className="account-name">验证码：</span>
						<Input bordered={false} maxLength={UserVerify.code} placeholder="请输入验证码"
						       className="account-info" onChange={(e) => this.loginVerify(e, "code")} value={code}/>
						<img src={vCode}  className="login-code" alt="验证码" onClick={()=>this.verificationCode()}/>
					</div>
					<Button className="register" loading={loading} onClick={()=>this.login()}>登录</Button>
					<div className="register-hit">忘记密码请联系超级管理员找回</div>
				</div>
			</div>
		)
	}
	
	render() {
		return (
			<div className="login">
				<img src={LoginFooterPic} className="ax-footer" alt=""/>
				<div className="login-content">
					<div className="login">
						<div className="content-log">
							<img src={LoginUserPic} className="content-login" alt=""/>
						</div>
						<div className="content-log">
							{this.LoginPage()}
						</div>
					</div>
					<div className="footer-info">
						<span>{CompanyInfo.encoding}</span>
						<span>{CompanyInfo.name}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Login)
