export interface User {
	uid?: string;
	type: string;
	patron?: string;
	firstName: string;
	lastName: string;
	email: string;
	institutionalEmail: string;
	cpf?: string;
	registry?: string; //matrícula
	mainImage: string;
	mainAddress: Address;
	secondaryAddress?: Address;
	mainPhone: PhoneNumber;
	secondaryPhone?: PhoneNumber;
	userInfo?: UserInfo;
}

export interface PhoneNumber {
	number?: string;
	type?: string;
}
export interface UserInfo {
	gender: string;
	maritalStatus: string;
	scholarity: string;
	profession: string;
	fatherName: string;
	motherName: string;
	birthdate: string;
	placeOfBirth?: string;
	nationality?: string;
	identityNumber: string;
	identityInstitution: string;
	professionalIdentity: string;
	admissionDate: string;
	stockingstation: string;
	bloodType: string;
	bloodRH: string;
	hasDependants: boolean;
	dependant: Dependant;
	healthInsurance: HealthInsurance;
}

export interface Address {
	street?: string;
	number?: string;
	complement?: string;
	district?: string;
	state?: string;
	city?: string;
	zipCode?: string;
}

export interface Dependant {
	type: string;
	name: string;
	cpf: string;
	birthdate: string;
	phone: PhoneNumber;
	email: string;
}

export interface HealthInsurance {
	HIOperator?: string;
	HIName?: string;
	HINumber?: string;
	HIPhoto?: string;
}
