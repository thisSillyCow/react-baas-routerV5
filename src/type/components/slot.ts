import {ReactNode} from "react";
import {ModalDetails} from "@/type";

export  interface SlotProps {
	modalDetails:ModalDetails;
	detailsSlot:ReactNode;
	afterClose:Function;
	afterConfirm?:Function;
}


