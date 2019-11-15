import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import * as moment from 'moment';

@Component({
	selector: 'app-news-details-page',
	templateUrl: './news-details-page.component.html',
	styleUrls: [ './news-details-page.component.scss' ],
})
export class NewsDetailsPageComponent implements OnInit, OnDestroy {
	post$: Observable<Post>;
	last3Posts$: Observable<Post[]>;
	moment = moment;

	navigationSubscription;

	constructor(private postsService: PostService, private router: Router) {
		this.navigationSubscription = this.router.events.subscribe((e: any) => {
			if (e instanceof NavigationEnd) {
				this.initializeComponent();
			}
		});
	}

	ngOnInit() {}

	ngOnDestroy() {
		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
	}

	showDetails(uid: string) {
		this.router.navigate([ 'news', uid ]);
	}

	private initializeComponent() {
		const id = this.router.url.split('/').pop();
		this.post$ = this.postsService.get(id);
		this.last3Posts$ = this.postsService.list((ref) => ref.limit(3));
	}
}
