import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { BaseService } from './base.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
	providedIn: 'root',
})
export class UserService extends BaseService<User> {
	constructor(afs: AngularFirestore) {
		const path = 'users';
		super(path, afs);
	}

	getUser(uid: string, queryFn?: QueryFn) {
		return this.afs.collection('users', queryFn).doc(uid).ref.get().then((doc) => {
			if (doc.exists) {
				var user = doc.data() as User;
				return user;
			}
		});
	}
}
