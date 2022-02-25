import {types, Instance,} from 'mobx-state-tree';
import {AppModelName} from "@/lib/local"
import Util from "@/lib/util"

export const AppModel = types
	.model('AppModel', {
		menuList: types.string,
		tabsList: types.string,
		sideMenu:types.string,
	})
	.views(self => {
		return {
			get getTabsList() {
				let tabsMeta : string= self.tabsList || Util.localRead(AppModelName.tabsName) || "[]";
				return JSON.parse(tabsMeta );
			},
			get getMenuList() {
				return self.menuList || "{}";
			},
			get getSideMenu(){
				const sideMenuStr: string = self.sideMenu || Util.localRead(AppModelName.sideSelected) || "{}";
				return JSON.parse(sideMenuStr)
			},
		}
	})
	.actions(self => ({
			
			setMenuList(menuList: string) {
				self.menuList = menuList;
			},
			setTabsList(list: string[]) {
				const tabsMeta: string = JSON.stringify(list);
				Util.localSave(AppModelName.tabsName, tabsMeta);
				self.tabsList = tabsMeta;
			},
			setSideMenu(sideList:string[]){
				const sideMenu: string = JSON.stringify(sideList);
				Util.localSave(AppModelName.sideSelected, sideMenu);
				self.sideMenu = sideMenu;
			},
		})
	);

export type AppModelInstance = Instance<typeof AppModel>;
