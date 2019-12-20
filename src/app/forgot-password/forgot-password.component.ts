import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarErrorComponent } from '../snackbar-error/snackbar-error.component';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: [ './forgot-password.component.scss' ],
})
export class ForgotPasswordComponent implements OnInit {
	passwordRecoveryForm: FormGroup;
	resetSent: boolean = false;
	constructor(private fb: FormBuilder, private auth: AuthService, private _snackBar: MatSnackBar) {}

	ngOnInit() {
		this.passwordRecoveryForm = this.fb.group({
			email: [ '', [ Validators.required, Validators.email ] ],
		});
	}

	resetPassword() {
		var email = this.passwordRecoveryForm.get('email').value;
		this.auth
			.resetPassword(email)
			.then((value) => {
				this.resetSent = true;
			})
			.catch((e) => {
				if (e.code == 'auth/invalid-email') {
					this.openSnackBar('E-mail inválido');
				} else if (e.code == 'auth/user-not-found') {
					this.openSnackBar('E-mail não cadastrado');
				} else {
					this.openSnackBar(e.code);
				}
			});
	}

	openSnackBar(message) {
		this._snackBar.openFromComponent(SnackbarErrorComponent, {
			duration: 3000,
			data: message,
		});
	}
}
