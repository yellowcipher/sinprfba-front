import { PostService } from './../services/post.service';
import { CarrouselService, Carrousel } from './../services/carrousel.service';
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
	carrousel$: Observable<Carrousel[]>;

	MAX_EXCERPT_LENGTH = 30;

	formatExcerpt(str: string) {
		const plainText = str.replace(/<[^>]+>/g, '');
		return plainText.length > this.MAX_EXCERPT_LENGTH
			? plainText.substr(0, this.MAX_EXCERPT_LENGTH) + '...' + " <a href='' >Leia mais</a>"
			: plainText;
	}

	constructor(private postService: PostService, private carrouselService: CarrouselService) {}

	ngOnInit() {
		this.posts$ = this.postService.list();
		this.carrousel$ = this.carrouselService.list();
	}
}
