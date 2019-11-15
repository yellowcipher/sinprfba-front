import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class CepService {
	constructor(private http: HttpClient) {}
	searchAddress(zipCode: string) {
		return this.http.get('http://viacep.com.br/ws/' + zipCode + '/json/').toPromise().then((response) => {
			return response;
			// console.log(response);
		});
	}
}
