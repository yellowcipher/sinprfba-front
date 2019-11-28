export interface User {
	uid?: string;
	firstName: string;
	lastName: string;
	email: string;
	cpf?: string;
	registry?: string; //matrícula
	mainImage: string;
	addresses?: Address[];
	phoneNumbers?: PhoneNumber[];
	userInfo?: UserInfo;
}

export interface PhoneNumber {
	number: string;
	type: string;
}
export interface UserInfo {
	gender: string;
	maritalStatus: string;
	scholarity: string;
	profession: string;
	fatherName: string;
	motherName: string;
	birthDate: string;
	placeOfBirth?: string;
	nationality: string;
	identityNumber: string;
	identityInstitution: string;
	ctps: string;
	OAB: string;
	professionalIdentity: string;
}

export interface Address {
	street: string;
	number: string;
	complement: string;
	district: string;
	state: string;
	city: string;
	zipCode: string;
}
