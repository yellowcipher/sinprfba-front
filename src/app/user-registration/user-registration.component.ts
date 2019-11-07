import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhoneNumber, Address } from '../models/user';
import { CepService } from '../services/cep.service';

@Component({
	selector: 'app-user-registration',
	templateUrl: './user-registration.component.html',
	styleUrls: [ './user-registration.component.scss' ],
})
export class UserRegistrationComponent implements OnInit {
	// public mask = [ '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
	// public mask = function(rawValue) {
	// 	if (rawValue.length > 14) {
	// 		return [ '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
	// 	} else {
	// 		return [ '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
	// 	}
	// };

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

	fileToUpload: File;
	phones: PhoneNumber[] = [ { number: '', type: '' } ];
	addresses: Address[] = [ { street: '', number: '', complement: '', district: '', state: '', city: '', zipCode: '' } ];

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
	oneMoreAddress() {
		this.addresses.push({ street: '', number: '', complement: '', district: '', state: '', city: '', zipCode: '' });
		console.log(this.addresses);
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
		// console.log(jsonAddress);
	}

	onAddressChange(index, field, value) {
		this.addresses[index][field] = value;
	}

	//   Mask mask = function (rawValue) {
	//   // add logic to generate your mask array
	//   return [ /*your mask array*/]
	// }
}
