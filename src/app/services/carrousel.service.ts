import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseService } from './base.service';

export interface Carrousel {
	uid?: string;
	title: string;
	excerpt: string;
	// font: string;
	// content: string;
	// mainImage?: File;
	mainImageUrl?: string;
	// slides?: File[];
	// slidesUrls?: string[];
	// files?: File[];
	// filesUrls?: string[];
	createdAt?: Date;
	// updatedAt?: Date;
	// userUpd: string;
	// dhPublicacao: string;
	// dhVigência?: string;
	// areaSite: string;
	// destaque: boolean;
	// tags: string;
	// estado: string;//cadastrado, cancelado, publicado, suspenso, não vigente
}

@Injectable({
	providedIn: 'root',
})
export class CarrouselService extends BaseService<Carrousel> {
	constructor(afs: AngularFirestore) {
		const path = 'carrousel';
		super(path, afs);
	}
}
