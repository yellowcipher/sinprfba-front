import { Component, OnInit } from '@angular/core';
import { BoardService, Board } from './../services/board.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-institutional-page',
	templateUrl: './institutional-page.component.html',
	styleUrls: [ './institutional-page.component.scss' ],
})
export class InstitutionalPageComponent implements OnInit {
	board$: Observable<Board[]>;

	constructor(private boardService: BoardService) {}

	ngOnInit() {
		this.board$ = this.boardService.list();
	}
}
