/// <reference path="../_all.ts" />

module ContactManagerApp {
	export class MainController {
		static $inject = ['userService', '$mdSidenav', '$mdToast','$mdDialog','$mdMedia', '$mdBottomSheet'];

		constructor(
				public userService: IUserService,
				public $mdSidenav: angular.material.ISidenavService,
				public $mdToast: angular.material.IToastService,
				public $mdDialog: angular.material.IDialogService,
				public $mdMedia: angular.material.IMedia,
				public $mdBottomSheet: angular.material.IBottomSheetService) {
			var self = this;

			this.userService
			.loadAllUsers()
			.then((users: User[]) => {
				self.users = users;
				self.selected = users[0];
				self.userService.selectedUser = self.selected;
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
			this.userService.selectedUser = this.selected;

			var sidenav = this.$mdSidenav('left');
			if (sidenav.isOpen()) {
				sidenav.close();
			}
			this.tabIndex = 0;
		}

		showContactOptions($event) {
			this.$mdBottomSheet.show({
				parent: document.getElementById('wrapper'),
				templateUrl: './dist/views/contactSheet.html',
				controller: 'ContactPanelController',
				controllerAs: 'cp',
				bindToController: true,
				targetEvent: $event
			}).then((clickedItem) => {
				clickedItem && console.log(clickedItem.name + ' clicked!');
			})
		}

		toggleSidenav(): void {
			this.$mdSidenav('left').toggle();
		}

		addUser($event) {
			var self = this;

			var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));

			this.$mdDialog.show({
				templateUrl: './dist/views/newUserDialog.html',
				parent: angular.element(document.body),
				targetEvent: $event,
				controller: 'AddUserDialogController',
				controllerAs: 'ctrl',
				clickOutsideToClose: true,
				fullscreen: useFullScreen
			}).then((user: User) => {
				
			},
			() => {
				console.log('Cancel...');
			});
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

		clearNotes($event): void {
			var confirm = this.$mdDialog.confirm()
				.title('Are you sure?')
				.textContent('Really Sure?')
				.targetEvent($event)
				.ok('Yup')
				.cancel('Nope');

			var self = this;
			this.$mdDialog.show(confirm)
				.then(() => {
					self.selected.notes = [];
					self.openToast('Cleared Notes');
				});
		}




	}
} 
