import { Component, OnInit } from '@angular/core';
import { logIn } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: [ './login-page.component.scss' ],
})
export class LoginPageComponent implements OnInit {
	emailTest = 'jedhai.psn@gmail.com';
	passwordTest = '123456789';
	constructor(private router: Router) {}

	ngOnInit() {}

	signIn() {
		try {
			logIn(this.emailTest, this.passwordTest).then((value) => {
				this.router.navigateByUrl('/profile');
			});
		} catch (e) {
			console.log(e);
		}
	}
}
