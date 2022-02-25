import {types,} from 'mobx-state-tree';
import {AppModel}  from "./module/app";
import {UserModel} from "./module/user"
const  CountModel = types
	.model('CountModel', {
		count: types.number,
		AppInfo: types.optional(AppModel, {
			menuList:"{}",
			tabsList:"",
			sideMenu:"",
		}),
		UserInfo:types.optional(UserModel,{
			userInfo: "{}",
		}),
	})
	.actions(self => ({
			increase() {
				self.count += 1;
			},
		})
	);
const store = CountModel.create({
	count: 0,
});
export default store;
