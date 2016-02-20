/// <reference path="../_all.ts" />

module ContactManagerApp {
	export class ContactPanelController {
		static $inject = ['userService', '$mdBottomSheet'];

		constructor(
			private userService: IUserService,
			private $mdBottomSheet: angular.material.IBottomSheetService) {
			this.user = userService.selectedUser;
		}

		submitContact(action): void {
			this.$mdBottomSheet.hide(action);
		}

		private actions = [
			{ name: 'Phone', icon: 'phone' },
			{ name: 'Google+', icon: 'google_plus' },
			{ name: 'Twitter', icon: 'twitter' }
		];
		private user: User;
	}
} 

