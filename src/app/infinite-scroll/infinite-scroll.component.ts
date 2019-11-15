import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, throttleTime, mergeMap, scan, toArray, filter } from 'rxjs/operators';
import { Post } from '../models/post';
import * as moment from 'moment';
import { Router } from '@angular/router';

const BATCH_SIZE = 10;

@Component({
	selector: 'app-infinite-scroll',
	templateUrl: './infinite-scroll.component.html',
	styleUrls: [ './infinite-scroll.component.scss' ],
})
export class InfiniteScrollComponent {
	@ViewChild('viewport', { read: CdkVirtualScrollViewport, static: false })
	viewport: CdkVirtualScrollViewport;
	now: Date;
	moment = moment;

	theEnd = false;

	offset = new BehaviorSubject(null);
	infinite: Observable<Post[]>;

	constructor(private db: AngularFirestore, private router: Router) {
		this.now = new Date();
		const batchMap = this.offset.pipe(
			throttleTime(500),
			mergeMap((n) => this.getBatch(n)),
			scan((acc, batch) => {
				return { ...acc, ...batch };
			}, {}),
		);

		this.infinite = batchMap.pipe(map((v) => Object.values(v)));
	}

	nextBatch(e, offset) {
		if (this.theEnd) {
			return;
		}

		const end = this.viewport.getRenderedRange().end;
		const total = this.viewport.getDataLength();

		if (end === total) {
			this.offset.next(offset);
		}
	}

	trackByIdx(i) {
		return i;
	}

	getBatch(lastSeen) {
		let collection: AngularFirestoreCollection;

		if (lastSeen != null) {
			collection = this.db.collection('posts', (ref) =>
				ref
					.where('updatedAt', '<=', new Date())
					.orderBy('updatedAt', 'desc')
					.startAfter(lastSeen)
					.limit(BATCH_SIZE),
			);
		} else {
			collection = this.db.collection('posts', (ref) =>
				ref.where('updatedAt', '<=', new Date()).orderBy('updatedAt', 'desc').limit(BATCH_SIZE),
			);
		}

		return collection.snapshotChanges().pipe(
			tap((arr) => (arr.length ? null : (this.theEnd = true))),
			map((arr) => {
				return arr.reduce((acc, cur) => {
					const id = cur.payload.doc.id;
					const data = cur.payload.doc.data();
					return { ...acc, [id]: data };
				}, {});
			}),
		);
	}

	showDetails(id) {
		console.log(id);
		this.router.navigate([ 'news', id ]);
	}
}
