// import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
	user$: Observable<User>;

	constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
		this.user$ = this.afAuth.authState.pipe(
			switchMap((user) => {
				if (user) {
					return this.afs.doc<User>('users/' + user.uid).valueChanges();
				} else {
					return of(null);
				}
			}),
		);
	}

	async signIn(email, password) {
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
	}

	async logIn(email, password) {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}

	async signOut() {
		await this.afAuth.auth.signOut();
		return this.router.navigate([ '/home' ]);
	}

	private updateUserData(user) {
		const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/' + user.uid);

		// const data = {
		//     uid: user.uid
		// }

		return userRef.set(user, { merge: true });
	}

	resetPassword(email: string) {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}
}
