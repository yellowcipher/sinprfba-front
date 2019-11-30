import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: [ './edit-profile.component.scss' ],
})
export class EditProfileComponent implements OnInit {
	editForm: FormGroup;
	user$: User;

	constructor(private fb: FormBuilder, private userService: UserService) {}

	ngOnInit() {
		this.editForm = this.fb.group({
			firstName: [ '', [ Validators.required, Validators.minLength(3) ] ],
			lastName: [ '', [ Validators.required, Validators.minLength(3) ] ],
			email: [ '', [ Validators.required, Validators.email ] ],
			// password: ['', [Validators.required, Validators.minLength(8)]],
			cpf: [ '', [ Validators.required, Validators.minLength(14) ] ],
			registry: [ '' ],
			mainPhone: [ '', [ Validators.required, Validators.minLength(14) ] ],
			mainPhoneType: [ '', [ Validators.required ] ],
			secondaryPhone: [ '' ],
			secondaryPhoneType: [ '' ],
			mainCEP: [ '', [ Validators.required ] ],
			mainStreet: [ '', [ Validators.required ] ],
			mainNumber: [ '', [ Validators.required ] ],
			mainComplement: [ '', [ Validators.required ] ],
			mainDistrict: [ '', [ Validators.required ] ],
			mainCity: [ '', [ Validators.required ] ],
			mainState: [ '', [ Validators.required ] ],
			secondaryCEP: [ '' ],
			secondaryStreet: [ '' ],
			secondaryNumber: [ '' ],
			secondaryComplement: [ '' ],
			secondaryDistrict: [ '' ],
			secondaryCity: [ '' ],
			secondaryState: [ '' ],
			gender: [ '', [ Validators.required ] ],
			maritalStatus: [ '', [ Validators.required ] ],
			scholarity: [ '', [ Validators.required ] ],
			profession: [ '', [ Validators.required ] ],
			fatherName: [ '', [ Validators.required ] ],
			motherName: [ '', [ Validators.required ] ],
			birthdate: [ '', [ Validators.required ] ],
			placeOfBirth: [ '', [ Validators.required ] ],
			nationality: [ '', [ Validators.required ] ],
			identityNumber: [ '', [ Validators.required ] ],
			identityInstitution: [ '', [ Validators.required ] ],
			ctps: [ '', [ Validators.required ] ],
			oab: [ '', [ Validators.required ] ],
			professionalIdentity: [ '', [ Validators.required ] ],
		});

		var uid = firebase.auth().currentUser.uid;
		this.userService.getUser(uid).then((value) => {
			this.user$ = value;
			this.editForm.get('firstName').setValue(this.user$.firstName);
			this.editForm.get('lastName').setValue(this.user$.lastName);
			this.editForm.get('email').setValue(this.user$.email);
			this.editForm.get('cpf').setValue(this.user$.cpf);
			this.editForm.get('registry').setValue(this.user$.registry);
			this.editForm.get('cpf').setValue(this.user$.cpf);
		});
	}

	get firstName() {
		return this.editForm.get('firstName');
	}

	get email() {
		return this.editForm.get('email');
	}

	// set firstName(name){
	//   this.firstName = name;
	// }

	logField() {
		// console.log(this.firstName.value, this.email.value);
		// this.firstName.value = 'good';
	}
}
