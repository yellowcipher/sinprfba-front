import { Component, OnInit } from '@angular/core';
// import { logIn } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: [ './login-page.component.scss' ],
})
export class LoginPageComponent implements OnInit {
	// emailTest = 'jedhai.psn@gmail.com';
	// passwordTest = '10548196';
	loginForm: FormGroup;
	constructor(private router: Router, private fb: FormBuilder, public auth: AuthService) {}

	ngOnInit() {
		this.loginForm = this.fb.group({
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required, Validators.minLength(8) ] ],
		});
	}

	signIn() {
		var email = this.loginForm.get('email').value;
		var password = this.loginForm.get('password').value;
		try {
			this.auth.logIn(email, password).then((value) => {
				// this.router.navigateByUrl('/profile');
			});
		} catch (e) {
			console.log(e);
		}
	}
}
