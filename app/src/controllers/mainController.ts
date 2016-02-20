/// <reference path="../_all.ts" />

module ContactManagerApp {
	export class MainController {
		static $inject = ['userService', '$mdSidenav'];

		constructor(
				public userService: IUserService
				public $mdSidenav: angular.material.ISidenavService) {
			var self = this;

			this.userService
			.loadAllUsers()
			.then((users: User[]) => {
				self.users = users;
				console.log(self.users);
			});

		}

		users: User[] = [];
		message: string = "Hello from Controller";
		
		toggleSidenav(): void {
			this.$mdSidenav('left').toggle();
		}		
	}

} 
