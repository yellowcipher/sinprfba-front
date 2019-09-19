import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IBaseService<T> {
	get(id: string): Observable<T>;
	list(): Observable<T[]>;
	add(item: T): Promise<T>;
	update(item: T): Promise<T>;
	delete(id: string): void;
}

export abstract class BaseService<T> implements IBaseService<T> {
	protected collection: AngularFirestoreCollection<T>;

	constructor(path: string, protected afs: AngularFirestore) {
		this.collection = this.afs.collection(path);
	}
	get(id: string): Observable<T> {
		return this.collection.doc<T>(id).snapshotChanges().pipe(
			map((action) => {
				const data = action.payload.data() as T;
				const id = action.payload.id;
				return { id, ...data };
			}),
		);
	}

	list(): Observable<T[]> {
		return this.collection.snapshotChanges().pipe(
			map((actions) =>
				actions.map((a) => {
					const data = a.payload.doc.data() as T;
					const id = a.payload.doc.id;
					return { id, ...data };
				}),
			),
		);
	}
	add(item: T): Promise<T> {
		throw new Error('Method not implemented.');
	}
	update(item: T): Promise<T> {
		throw new Error('Method not implemented.');
	}
	delete(id: string): void {
		throw new Error('Method not implemented.');
	}
}
