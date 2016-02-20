/// <reference path="../_all.ts" />

module ContactManagerApp {
	export class MainController {
		static $inject = ['userService', '$mdSidenav', '$mdToast'];

		constructor(
				public userService: IUserService,
				public $mdSidenav: angular.material.ISidenavService,
				public $mdToast: angular.material.IToastService) {
			var self = this;

			this.userService
			.loadAllUsers()
			.then((users: User[]) => {
				self.users = users;
				self.selected = users[0];
				console.log(self.users);
			});
		}

		tabIndex: number = 0;
		searchText: string = '';
		users: User[] = [];
		selected: User = null;
		message: string = "Hello from Controller";
		
		selectUser(user: User): void {
			this.selected = user;

			var sidenav = this.$mdSidenav('left');
			if (sidenav.isOpen()) {
				sidenav.close();
			}
			this.tabIndex = 0;
		}

		toggleSidenav(): void {
			this.$mdSidenav('left').toggle();
		}

		removeNote(note: Note): void {
			var foundIndex = this.selected.notes.indexOf(note);
			this.selected.notes.splice(foundIndex, 1);

			this.openToast('Note Removed');
		}

		openToast(message: string): void {
			this.$mdToast.show(
				this.$mdToast.simple()
					.textContent(message)
					.position('top right')
					.hideDelay(3000)
			);
		}
	}
} 
