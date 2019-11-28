import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhoneNumber, Address, User, UserInfo } from '../models/user';
import { CepService } from '../services/cep.service';
// import { User } from 'firebase';
// import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-user-registration',
	templateUrl: './user-registration.component.html',
	styleUrls: [ './user-registration.component.scss' ],
})
export class UserRegistrationComponent implements OnInit {
	howManyPhones: number[] = [ 7 ];

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

	fileToUpload: File;
	phones: PhoneNumber[] = [ { number: '', type: '' } ];
	addresses: Address[] = [ { street: '', number: '', complement: '', district: '', state: '', city: '', zipCode: '' } ];
	userFirstName: String;
	professionalIdentity: String;
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
		addresses: this.addresses,
		phoneNumbers: this.phones,
		userInfo: this.userInfo,
	};
	constructor(private cepService: CepService) {}

	ngOnInit() {}
	@ViewChild('labelImport', { static: true })
	labelImport: ElementRef;

	onFileChange(files: FileList) {
		this.labelImport.nativeElement.innerText = Array.from(files).map((f) => f.name).join(', ');
		this.fileToUpload = files.item(0);
	}

	oneMorePhone() {
		this.phones.push({ number: '', type: '' });
	}

	oneLessPhone() {
		if (this.phones.length > 1) {
			this.phones.pop();
		}
	}
	oneMoreAddress() {
		this.addresses.push({ street: '', number: '', complement: '', district: '', state: '', city: '', zipCode: '' });
		// console.log(this.addresses);
	}

	oneLessAddress() {
		if (this.addresses.length > 1) {
			this.addresses.pop();
		}
	}

	onNumberChange(index, value) {
		this.phones[index].number = value;
	}

	onTypeChange(index, value) {
		this.phones[index].type = value;
	}

	searchByZipCode(index) {
		this.cepService.searchAddress(this.addresses[index].zipCode).then((value) => {
			this.addresses[index].street = value['logradouro'];
			this.addresses[index].number = value['unidade'];
			this.addresses[index].complement = value['complemento'];
			this.addresses[index].district = value['bairro'];
			this.addresses[index].state = value['uf'];
			this.addresses[index].city = value['localidade'];
		});
	}

	onAddressChange(index, field, value) {
		this.addresses[index][field] = value;
	}

	onUserFieldChange(field, value) {
		this.user[field] = value;
	}

	onUserInfoFieldChange(field, value) {
		this.user.userInfo[field] = value;
	}

	teste() {
		console.log(this.user);
	}
}
