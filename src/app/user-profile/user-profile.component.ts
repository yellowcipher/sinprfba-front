import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from './../services/user.service';
import { User } from '../models/user';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: [ './user-profile.component.scss' ],
})
export class UserProfileComponent implements OnInit {
	user$: User;

	constructor(private userService: UserService) {}

	ngOnInit() {
		var uid = firebase.auth().currentUser.uid;
		this.userService.getUser(uid).then((value) => {
			this.user$ = value;
			console.log('THIS.USER:', this.user$);
		});
	}
}
