import { PostService } from './../services/post.service';
import { CarrouselService } from './../services/carrousel.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: [ './home-page.component.scss' ],
})
export class HomePageComponent implements OnInit {
	images = [ 1, 2, 3 ].map(() => `https://picsum.photos/510/340?random&t=${Math.random()}`);
	posts$: Observable<Post[]>;
	carrousel$: Observable<Post[]>;
	staticCarrousel: Observable<Post[]>;
	staticSlides: Post[] = [];
	slides: Post[] = [];

	MAX_EXCERPT_LENGTH = 50;

	formatExcerpt(str: string) {
		const plainText = str.replace(/<[^>]+>/g, '');
		return plainText.length > this.MAX_EXCERPT_LENGTH
			? plainText.substr(0, this.MAX_EXCERPT_LENGTH) + '...' + " <a href='' >Leia mais</a>"
			: plainText;
	}

	constructor(private postService: PostService, private carrouselService: CarrouselService, private router: Router) {}

	ngOnInit() {
		this.posts$ = this.postService.list();
		// this.carrousel$ = this.postService.list();
		this.staticCarrousel = this.carrouselService.list();

		this.staticCarrousel.subscribe((slide) => {
			slide.forEach((element) => {
				this.staticSlides.push(element);
			});
		});

		this.posts$.subscribe((slide) => {
			this.slides = this.staticSlides;
			for (let i = 0; i < slide.length; i++) {
				const element = slide[i];
				if (element.mainCarrousel) {
					this.slides.push(element);
				}
			}
		});
	}

	showDetails(id) {
		console.log(id);
		this.router.navigate([ 'news', id ]);
	}
}
