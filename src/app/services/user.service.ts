import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { BaseService } from './base.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
		const path = 'users';
		// super(path, afs);
	}

	// storage: AngularFireStorage;
	getUser(uid: string, queryFn?: QueryFn) {
		return this.afs.collection('users', queryFn).doc(uid).ref.get().then((doc) => {
			if (doc.exists) {
				var user = doc.data() as User;
				return user;
			}
		});
	}

	upload(file: File, options?: { filename?: string; folder?: string }): Promise<string> {
		const folder = options.folder || '';
		const filename = options.filename || file.name;
		const path = folder + filename;
		const fileRef = this.storage.ref(path);
		const task = this.storage.upload(path, file);

		return new Promise((resolve) => {
			task.snapshotChanges().pipe(finalize(() => resolve(fileRef.getDownloadURL().toPromise()))).subscribe();
		});
	}

	// private join(...args: string[]) {
	// 	// Split the inputs into a list of path commands.
	// 	let parts = [];
	// 	console.log(args);

	// 	for (let i = 0, l = args.length; i < l; i++) {
	// 		parts = parts.concat(args[i].split('/'));
	// 	}
	// 	// Interpret the path commands to get the new resolved path.
	// 	const newParts = [];
	// 	for (let i = 0, l = parts.length; i < l; i++) {
	// 		const part = parts[i];
	// 		// Remove leading and trailing slashes
	// 		// Also remove "." segments
	// 		if (!part || part === '.') continue;
	// 		// Interpret ".." to pop the last segment
	// 		if (part === '..') newParts.pop();
	// 		else
	// 			// Push new path segments.
	// 			newParts.push(part);
	// 	}
	// 	// Preserve the initial slash if there was one.
	// 	if (parts[0] === '') newParts.unshift('');
	// 	// Turn back into a single string path.
	// 	return newParts.join('/') || (newParts.length ? '/' : '.');
	// }
}
