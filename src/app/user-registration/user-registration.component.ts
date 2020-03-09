import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User, UserInfo, Dependant, HealthInsurance } from '../models/user';
import { UserService } from '../services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
// import { createUser } from '../services/auth.service';

@Component({
	selector: 'app-user-registration',
	templateUrl: './user-registration.component.html',
	styleUrls: [ './user-registration.component.scss' ],
})
export class UserRegistrationComponent implements OnInit {
	@ViewChild('labelImport', { static: true })
	labelImport: ElementRef;

	@ViewChild('HIlabelImport', { static: true })
	HIlabelImport: ElementRef;

	userForm: FormGroup;
	form1: FormGroup;
	form2: FormGroup;
	form3: FormGroup;
	form4: FormGroup;
	form5: FormGroup;
	form6: FormGroup;
	// user$: User;
	public loading = false;
	public hasPatron = null;
	public patronName = '';
	public page = 1;

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

	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private afs: AngularFirestore,
		private auth: AuthService,
		private router: Router,
	) {}
	// userPassword: String;
	fileToUpload: File;
	HIFile: File;
	dependant: Dependant = {
		type: '',
		name: '',
		cpf: '',
		birthdate: '',
		email: '',
		phone: { number: '', type: '' },
	};

	healthInsurance: HealthInsurance = {
		HIOperator: '',
		HIName: '',
		HINumber: '',
		HIPhoto: '',
	};

	userInfo: UserInfo = {
		gender: '',
		maritalStatus: '',
		scholarity: '',
		profession: '',
		fatherName: '',
		motherName: '',
		birthdate: '',
		placeOfBirth: '',
		nationality: '',
		identityNumber: '',
		identityInstitution: '',
		professionalIdentity: '',
		admissionDate: '',
		stockingstation: '',
		bloodType: '',
		bloodRH: '',
		hasDependants: null,
		dependant: this.dependant,
		healthInsurance: this.healthInsurance,
	};
	user: User = {
		firstName: '',
		lastName: '',
		type: '',
		patron: '',
		email: '',
		institutionalEmail: '',
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
		this.userForm = this.fb.group({});

		this.form1 = this.fb.group({
			type: [ '', [ Validators.required ] ],
			patronsCPF: [ '', [ Validators.minLength(14) ] ],
		});

		this.form2 = this.fb.group({
			firstName: [ '', [ Validators.required ] ],
			lastName: [ '', [ Validators.required ] ],
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required, Validators.minLength(8) ] ],
			cpf: [ '', [ Validators.required, Validators.minLength(14) ] ],
			registry: [ '' ],
			photoFile: [ null ],
		});

		this.form3 = this.fb.group({
			institutionalEmail: [ '', [ Validators.email ] ],
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
		});

		this.form4 = this.fb.group({
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
			admissionDate: [ '' ],
			stockingstation: [ '' ],
			bloodType: [ '', [ Validators.required ] ],
			bloodRH: [ '', [ Validators.required ] ],
		});

		this.form5 = this.fb.group({
			hasDependants: [ '' ],
			dependantType: [ '' ],
			otherDependentType: [ '' ],
			dependantName: [ '' ],
			dependantcpf: [ '' ],
			dependantBirthdate: [ '' ],
			dependantPhoneNumber: [ '' ],
			dependantEmail: [ '', [ Validators.email ] ],
		});

		this.form6 = this.fb.group({
			HIOperator: [ '' ],
			otherHIOperator: [ '' ],
			HIName: [ '' ],
			otherHIName: [ '' ],
			HINumber: [ '' ],
			HIPhoto: [ '' ],
		});
	}

	onFileChange(files: FileList) {
		// this.labelImport.nativeElement.innerText = Array.from(files).map((f) => f.name).join(', ');
		this.fileToUpload = files.item(0);
	}

	onHIPhotoChange(files: FileList) {
		// this.HIlabelImport.nativeElement.innerText = Array.from(files).map((f) => f.name).join(', ');
		this.HIFile = files.item(0);
	}

	registerUser() {
		if (this.form6.valid) {
			this.loading = true;
			this.auth
				.signIn(this.form2.get('email').value, this.form2.get('password').value)
				.then((result) => {
					const uid = result.user.uid;
					this.buildUser(uid);

					if (this.HIFile != null) {
						this.userService.upload(this.HIFile, { folder: 'users/' + uid + '/' }).then((imageURL) => {
							this.user.userInfo.healthInsurance.HIPhoto = imageURL;
							// console.log(this.user);
							this.afs.collection('users').doc(uid).set(this.user, { merge: true }).then((value) => {});
						});
					}

					if (this.fileToUpload != null) {
						this.userService.upload(this.fileToUpload, { folder: 'users/' + uid + '/' }).then((imageURL) => {
							this.user.mainImage = imageURL;
							console.log(this.user);
							this.afs.collection('users').doc(uid).set(this.user, { merge: true }).then((value) => {
								this.loading = false;
								this.router.navigate([ '/login' ]);
							});
						});
					} else {
						this.loading = false;
						this.router.navigate([ '/login' ]);
					}
				})
				.catch((e) => {
					this.loading = false;
					console.log(e);
				});
		}
	}

	buildUser(uid) {
		this.user.type = this.form1.get('type').value;
		this.user.patron = this.form1.get('patronsCPF').value;
		this.user.firstName = this.form2.get('firstName').value;
		this.user.lastName = this.form2.get('lastName').value;
		this.user.email = this.form2.get('email').value;
		this.user.cpf = this.form2.get('cpf').value;
		this.user.registry = this.form2.get('registry').value;
		this.user.institutionalEmail = this.form3.get('institutionalEmail').value;
		this.user.mainAddress = {
			street: this.form3.get('mainStreet').value,
			number: this.form3.get('mainNumber').value,
			complement: this.form3.get('mainComplement').value,
			district: this.form3.get('mainDistrict').value,
			state: this.form3.get('mainState').value,
			city: this.form3.get('mainCity').value,
			zipCode: this.form3.get('mainCEP').value,
		};
		this.user.secondaryAddress = {
			street: this.form3.get('secondaryStreet').value,
			number: this.form3.get('secondaryNumber').value,
			complement: this.form3.get('secondaryComplement').value,
			district: this.form3.get('secondaryDistrict').value,
			state: this.form3.get('secondaryState').value,
			city: this.form3.get('secondaryCity').value,
			zipCode: this.form3.get('secondaryCEP').value,
		};
		this.user.mainPhone = {
			number: this.form3.get('mainPhone').value,
			type: this.form3.get('mainPhoneType').value,
		};
		this.user.secondaryPhone = {
			number: this.form3.get('secondaryPhone').value,
			type: this.form3.get('secondaryPhoneType').value,
		};

		this.userInfo.gender = this.form4.get('gender').value;
		this.userInfo.maritalStatus = this.form4.get('maritalStatus').value;
		this.userInfo.scholarity = this.form4.get('scholarity').value;
		this.userInfo.profession = this.form4.get('profession').value;
		this.userInfo.bloodType = this.form4.get('bloodType').value;
		this.userInfo.bloodRH = this.form4.get('bloodRH').value;
		this.userInfo.fatherName = this.form4.get('fatherName').value;
		this.userInfo.motherName = this.form4.get('motherName').value;
		this.userInfo.birthdate = this.form4.get('birthdate').value;
		this.userInfo.placeOfBirth = this.form4.get('placeOfBirth').value;
		this.userInfo.nationality = this.form4.get('nationality').value;
		this.userInfo.identityNumber = this.form4.get('identityNumber').value;
		this.userInfo.identityInstitution = this.form4.get('identityInstitution').value;
		this.userInfo.admissionDate = this.form4.get('admissionDate').value;
		this.userInfo.stockingstation = this.form4.get('stockingstation').value;
		this.userInfo.hasDependants = this.form5.get('hasDependants').value;

		if (this.form5.get('dependantType').value == 'Outro') {
			this.userInfo.dependant.type = this.form5.get('otherDependantType').value;
		} else {
			this.userInfo.dependant.type = this.form5.get('dependantType').value;
		}

		this.userInfo.dependant.name = this.form5.get('dependantName').value;
		this.userInfo.dependant.cpf = this.form5.get('dependantcpf').value;
		this.userInfo.dependant.birthdate = this.form5.get('dependantBirthdate').value;
		this.userInfo.dependant.phone = this.form5.get('dependantPhoneNumber').value;
		this.userInfo.dependant.email = this.form5.get('dependantEmail').value;

		if (this.form6.get('HIOperator').value == 'Outro') {
			this.userInfo.healthInsurance.HIOperator = this.form6.get('otherHIOperator').value;
		} else {
			this.userInfo.healthInsurance.HIOperator = this.form6.get('HIOperator').value;
		}

		if (this.form6.get('HIName').value == 'Outro') {
			this.userInfo.healthInsurance.HIName = this.form6.get('otherHIName').value;
		} else {
			this.userInfo.healthInsurance.HIName = this.form6.get('HIName').value;
		}
		this.userInfo.healthInsurance.HINumber = this.form6.get('HINumber').value;

		this.user.uid = uid;
		// console.log(this.user);
	}

	async searchByCPF(cpf) {
		var fullName;
		await this.afs.collection('users', (ref) => ref.where('cpf', '==', cpf)).snapshotChanges().subscribe((val) => {
			var response = val[0];

			if (response != undefined) {
				var firstName = response['payload']['doc']['_document']['proto']['fields']['firstName']['stringValue'];
				var lastName = response['payload']['doc']['_document']['proto']['fields']['lastName']['stringValue'];
				fullName = firstName + ' ' + lastName;
				this.hasPatron = true;
				this.patronName = fullName;
				// console.log(fullName);

				return fullName;
			} else {
				fullName = null;
				this.hasPatron = false;
				return fullName;
			}

			// console.log(val[0]['payload']['doc']['_document']['proto']['fields'])
		});
	}

	changePage(value) {
		this.page += value;
	}

	scrollToTop() {
		// window.scrollTo(0, 0);

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}
}
