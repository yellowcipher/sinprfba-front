import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import * as moment from 'moment';

@Component({
	selector: 'app-news-details-page',
	templateUrl: './news-details-page.component.html',
	styleUrls: [ './news-details-page.component.scss' ],
})
export class NewsDetailsPageComponent implements OnInit {
	post$: Observable<Post>;
	moment = moment;

	constructor(private postsService: PostService, private router: Router) {
		const id = this.router.url.split('/').pop();
		this.post$ = postsService.get(id);
	}

	ngOnInit() {}
}
