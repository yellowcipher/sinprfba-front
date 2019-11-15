import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { BaseService } from './base.service';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class PostService extends BaseService<Post> {
	constructor(afs: AngularFirestore) {
		const path = 'posts';
		super(path, afs);
	}

	list(queryFn?: QueryFn): Observable<Post[]> {
		return this.afs.collection('posts', queryFn).snapshotChanges().pipe(
			map((actions) =>
				actions.map((a) => {
					const data = a.payload.doc.data() as Post;
					const id = a.payload.doc.id;
					return { id, ...data };
				}),
			),
		);
	}
}
