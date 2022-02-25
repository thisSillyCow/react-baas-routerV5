/**
 * @Author: ZH
 * @createdTime: 2022-01-2022/1/13 17:43
 * @description:
 */
import React from 'react'
import ReactDOM from 'react-dom';
 class index extends React.Component<any,any>{
	public constructor(props: any) {
		super(props);
		this.state = {
			alertStatus:false,
			alertTip:"提示",
		};
	}
	public confirm():void{
		this.setState({
			alertStatus:false,
		})
	}
	 public open(options:object):void{
		 this.setState({
			 alertStatus:true,
		 })
	 }
	render() {
		const {alertStatus ,alertTip} =this.state
		return (
			<div className="alert-con" style={alertStatus? {display:'block'}:{display:'none'}}>
				<div className="alert-context">
					<div className="alert-content-detail">{alertTip}</div>
					<div className="comfirm" onClick={this.confirm}>确认</div>
				</div>
			</div>
		);
	}
}


let div = document.createElement('div');
let props = {

};
document.body.appendChild(div);

let Box = ReactDOM.render(React.createElement(
	index,
	props
),div);



export default Box;
