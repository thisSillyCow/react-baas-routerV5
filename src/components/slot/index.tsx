/**
 * @Author: ZH
 * @createdTime: 2022-02-2022/2/17 16:43
 * @description:
 */
import React from 'react'
import {Modal, Button} from 'antd';
import {SlotProps} from "@/type/components/slot";
import {ModalInfo} from "@/lib/local";

export default class index extends React.Component<SlotProps, any> {
	constructor(props: SlotProps) {
		super(props)
	}
	
	public handleConfirm(): void {
		console.log("提交")
	}
	
	public handleCancel(): void {
		this.props?.afterClose()
	}
	
	
	public onCancel() {
		const {modalDetails} = this.props
		return (
			<Button key="back" onClick={()=>this.handleCancel()}>{modalDetails.cancelText || ModalInfo.CANCEL_NAME}</Button>
		)
	}
	
	onConfirm() {
		const {modalDetails} = this.props
		const loading = false;
		return (
			<Button key="ok" onClick={()=>this.handleConfirm()} loading={loading}>{modalDetails.confirmText || ModalInfo.CONFIRM_NAME}</Button>
		)
	}
	
	render() {
		const {detailsSlot,modalDetails} = this.props
		return (
			<Modal
				visible={modalDetails.modalVisible}
				title={modalDetails.modalTitle || ModalInfo.MODAL_TITLE}
				onCancel={e=>this.handleCancel()}
				centered={true}
				footer={[
					this.onCancel(),
					this.onConfirm(),
				]}
			>
				{detailsSlot}
			</Modal>
		);
	}
}
