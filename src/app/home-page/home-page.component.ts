import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: [ './home-page.component.scss' ],
})
export class HomePageComponent implements OnInit {
	images = [ 1, 2, 3 ].map(() => `https://picsum.photos/510/340?random&t=${Math.random()}`);

	constructor() {}

	ngOnInit() {}
}
