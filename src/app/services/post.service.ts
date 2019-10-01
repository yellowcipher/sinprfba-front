import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseService } from './base.service';
import { Post } from '../models/post';

@Injectable({
	providedIn: 'root',
})
export class PostService extends BaseService<Post> {
	constructor(afs: AngularFirestore) {
		const path = 'posts';
		super(path, afs);
	}
}
