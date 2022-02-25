import {Instance, types} from 'mobx-state-tree';

export const UserModel = types.model('UserModel', {
	userInfo: types.string,
}).actions(self => ({
	setUserInfo(info: string) {
		self.userInfo = info;
	},
}));
export type UserModelInstance = Instance<typeof UserModel>;
