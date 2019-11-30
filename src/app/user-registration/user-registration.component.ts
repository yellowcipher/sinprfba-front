import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User, UserInfo } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-user-registration',
	templateUrl: './user-registration.component.html',
	styleUrls: [ './user-registration.component.scss' ],
})
export class UserRegistrationComponent implements OnInit {
	@ViewChild('labelImport', { static: true })
	labelImport: ElementRef;

	userForm: FormGroup;
	user$: User;

	public phoneMask = function(rawValue) {
		let numbers = rawValue.match(/\d/g);
		let numberLength = 0;
		if (numbers) {
			numberLength = numbers.join('').length;
		}

		if (numberLength > 10) {
			return [ '(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
		} else {
			return [ '(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
		}
	};
	public zipCodeMask = [ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/ ];
	public dateMask = [ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/ ];
	public cpfMask = [ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ];

	constructor(private fb: FormBuilder, private userService: UserService) {}
	// userPassword: String;
	fileToUpload: File;
	userInfo: UserInfo = {
		gender: '',
		maritalStatus: '',
		scholarity: '',
		profession: '',
		fatherName: '',
		motherName: '',
		birthDate: '',
		placeOfBirth: '',
		nationality: '',
		identityNumber: '',
		identityInstitution: '',
		ctps: '',
		OAB: '',
		professionalIdentity: '',
	};
	user: User = {
		firstName: '',
		lastName: '',
		email: '',
		cpf: '',
		registry: '',
		mainImage: '',
		mainAddress: { street: '', number: '', complement: '', district: '', state: '', city: '', zipCode: '' },
		secondaryAddress: { street: '', number: '', complement: '', district: '', state: '', city: '', zipCode: '' },
		mainPhone: { number: '', type: '' },
		secondaryPhone: { number: '', type: '' },
		userInfo: this.userInfo,
		uid: '',
	};

	ngOnInit() {
		this.userForm = this.fb.group({
			firstName: [ '', [ Validators.required ] ],
			lastName: [ '', [ Validators.required ] ],
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required, Validators.minLength(8) ] ],
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

		this.userInfo.gender = this.userForm.get('gender').value;
	}

	registerUser() {
		if (this.userForm.valid) {
			console.log(this.user);
		}
		console.log(this.userForm.get('photoFile').value.toString());
	}

	onFileChange(files: FileList) {
		this.labelImport.nativeElement.innerText = Array.from(files).map((f) => f.name).join(', ');
		this.fileToUpload = files.item(0);
	}
}
