export interface User {
	uid: string;
	firstName: string;
	lastName: string;
	// apelido: string;
	email: string;
	cpfCnpj?: string;
	registry?: string; //matrícula
	// idtipo: string;
	// nmTipo?: string;
	// ativo?: string;
	mainImage: string;
	addresses?: Address[];
	phoneNumbers?: PhoneNumber[];
	userInfo?: UserInfo;
}

export interface PhoneNumber {
	// id: string;
	// pessoa: Pessoa;
	numero: string;
	tipoTelefone: string;
}
export interface UserInfo {
	// idpessoa: string;
	gender: string;
	// nmTipoSexo?: string;
	maritalStatus: string;
	// nmEstadoCivil?: string;
	scholarity: string;
	// nmTipoEscolaridade?: string;
	// escolaridadeIncompleta: string;
	profession: string;
	// profissao?: string;
	fatherName: string;
	motherName: string;
	birthDate: Date;
	// idnaturalidade: string;
	placeOfBirth?: string;
	nationality: string;
	identityNumber: string;
	identityInstitution: string;
	identityType: string;
	// nmTipoIdentidade?: string;
	ctps: string;
	stateEntry: string;
	municialEntry: string;
}

export interface Address {
	// id: string;
	// pessoa: Pessoa;
	address: string;
	// txEndereco: string;
	complement: string;
	district: string;
	// nrEndereco: string;
	cep: string;
	// idcidade: refId;
	city?: string;
	mailing?: boolean;
	mainAddress?: boolean;
	// observacao?: string;
	ativo?: boolean;
}
