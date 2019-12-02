import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: [ './edit-profile.component.scss' ],
})
export class EditProfileComponent implements OnInit {
	editForm: FormGroup;
	// user$: Observable<User>;

	constructor(private fb: FormBuilder, private userService: UserService, private auth: AuthService) {}

	ngOnInit() {
		// this.user$ = this.auth.user$;
		this.editForm = this.fb.group({
			firstName: [ '', [ Validators.required ] ],
			lastName: [ '', [ Validators.required ] ],
			email: [ '', [ Validators.required, Validators.email ] ],
			// password: ['', [Validators.required, Validators.minLength(8)]],
			cpf: [ '', [ Validators.required, Validators.minLength(14) ] ],
			registry: [ '' ],
			photoFile: [ null, [ Validators.required ] ],
			mainPhone: [ '', [ Validators.required, Validators.minLength(14) ] ],
			mainPhoneType: [ '', [ Validators.required ] ],
			secondaryPhone: [ '' ],
			secondaryPhoneType: [ '' ],
			mainCEP: [ '', [ Validators.required, Validators.minLength(9) ] ],
			mainStreet: [ '', [ Validators.required ] ],
			mainNumber: [ '', [ Validators.required ] ],
			mainComplement: [ '' ],
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
			maritalStatus: [ '' ],
			scholarity: [ '' ],
			profession: [ '' ],
			fatherName: [ '' ],
			motherName: [ '' ],
			birthdate: [ '', [ Validators.required, Validators.minLength(10) ] ],
			placeOfBirth: [ '' ],
			nationality: [ '' ],
			identityNumber: [ '', [ Validators.required ] ],
			identityInstitution: [ '', [ Validators.required ] ],
			ctps: [ '' ],
			oab: [ '' ],
			professionalIdentity: [ '' ],
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

	logInTest() {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				console.log('USER IS LOGGED IN', user);
				// this.fillFields(user.uid);
				this.userService.getUser(user.uid);
			} else {
				// No user is signed in.
			}
		});
	}

	// fillFields(uid) {
	// 	this.userService.getUser(uid).then((value) => {
	// 		this.user$ = value;
	// 		this.editForm.get('firstName').setValue(this.user$.firstName);
	// 		this.editForm.get('lastName').setValue(this.user$.lastName);
	// 		this.editForm.get('email').setValue(this.user$.email);
	// 		this.editForm.get('cpf').setValue(this.user$.cpf);
	// 		this.editForm.get('registry').setValue(this.user$.registry);
	// 		// this.editForm.get('mainPhone').setValue(this.user$.mainPhone.number);
	// 		// this.editForm.get('mainPhoneType').setValue(this.user$.mainPhone.type);
	// 		// this.editForm.get('secondaryPhone').setValue(this.user$.secondaryPhone.number);
	// 		// this.editForm.get('secondaryPhoneType').setValue(this.user$.secondaryPhone.type);
	// 		// this.editForm.get('mainCEP').setValue(this.user$.mainAddress.zipCode);
	// 		// this.editForm.get('mainStreet').setValue(this.user$.mainAddress.street);
	// 		// this.editForm.get('mainNumber').setValue(this.user$.mainAddress.number);
	// 		// this.editForm.get('mainComplement').setValue(this.user$.mainAddress.complement);
	// 		// this.editForm.get('mainDistrict').setValue(this.user$.mainAddress.district);
	// 		// this.editForm.get('mainCity').setValue(this.user$.mainAddress.city);
	// 		// this.editForm.get('mainState').setValue(this.user$.mainAddress.state);
	// 		// this.editForm.get('secondaryCEP').setValue(this.user$.secondaryAddress.zipCode);
	// 		// this.editForm.get('secondaryStreet').setValue(this.user$.secondaryAddress.street);
	// 		// this.editForm.get('secondaryNumber').setValue(this.user$.secondaryAddress.number);
	// 		// this.editForm.get('secondaryComplement').setValue(this.user$.secondaryAddress.complement);
	// 		// this.editForm.get('secondaryDistrict').setValue(this.user$.secondaryAddress.district);
	// 		// this.editForm.get('secondaryCity').setValue(this.user$.secondaryAddress.city);
	// 		// this.editForm.get('secondaryState').setValue(this.user$.secondaryAddress.state);
	// 		// this.editForm.get('maritalStatus').setValue(this.user$.userInfo.maritalStatus);
	// 		// this.editForm.get('scholarity').setValue(this.user$.userInfo.scholarity);
	// 		// this.editForm.get('profession').setValue(this.user$.userInfo.profession);
	// 		// this.editForm.get('fatherName').setValue(this.user$.userInfo.fatherName);
	// 		// this.editForm.get('motherName').setValue(this.user$.userInfo.motherName);
	// 		// this.editForm.get('birthdate').setValue(this.user$.userInfo.birthdate);
	// 		// this.editForm.get('placeOfBirth').setValue(this.user$.userInfo.placeOfBirth);
	// 		// this.editForm.get('nationality').setValue(this.user$.userInfo.nationality);
	// 		// this.editForm.get('identityNumber').setValue(this.user$.userInfo.identityNumber);
	// 		// this.editForm.get('identityInstitution').setValue(this.user$.userInfo.identityInstitution);
	// 		// this.editForm.get('ctps').setValue(this.user$.userInfo.ctps);
	// 		// this.editForm.get('oab').setValue(this.user$.userInfo.OAB);
	// 		// this.editForm.get('professionalIdentity').setValue(this.user$.userInfo.professionalIdentity);
	// 	});
	// }
}
