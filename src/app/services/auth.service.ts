import * as firebase from 'firebase/app';

export function createUser(email, password) {
	return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function logIn(email, password) {
	return firebase.auth().signInWithEmailAndPassword(email, password);
}
