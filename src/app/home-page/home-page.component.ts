import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: [ './home-page.component.scss' ],
})
export class HomePageComponent implements OnInit {
	images = [ 1, 2, 3 ].map(() => `https://picsum.photos/510/340?random&t=${Math.random()}`);
	posts$: Observable<Post[]>;

	constructor(private postService: PostService) {}

	ngOnInit() {
		this.posts$ = this.postService.list();
	}
}
