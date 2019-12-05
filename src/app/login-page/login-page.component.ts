import { Component, OnInit } from '@angular/core';
// import { logIn } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarErrorComponent } from '../snackbar-error/snackbar-error.component';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: [ './login-page.component.scss' ],
})
export class LoginPageComponent implements OnInit {
	// emailTest = 'jedhai.psn@gmail.com';
	// passwordTest = '10548196';
	// panelOpenState = false;
	loginForm: FormGroup;
	constructor(
		private router: Router,
		private fb: FormBuilder,
		public auth: AuthService,
		private _snackBar: MatSnackBar,
	) {}

	ngOnInit() {
		this.loginForm = this.fb.group({
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required, Validators.minLength(8) ] ],
		});
	}

	signIn() {
		var email = this.loginForm.get('email').value;
		var password = this.loginForm.get('password').value;
		if (this.loginForm.valid) {
			this.auth.logIn(email, password).catch((e) => {
				if (e.code == 'auth/user-not-found') {
					this.openSnackBar('Usuário não existe.');
				} else if (e.code == 'auth/wrong-password') {
					this.openSnackBar('Senha incorreta.');
				}
			});
		}
	}

	logOut() {
		this.auth.signOut();
	}

	openSnackBar(message) {
		this._snackBar.openFromComponent(SnackbarErrorComponent, {
			duration: 3000,
			data: message,
		});
	}
}
