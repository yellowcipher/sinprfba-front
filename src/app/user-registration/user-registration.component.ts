import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-user-registration',
	templateUrl: './user-registration.component.html',
	styleUrls: [ './user-registration.component.scss' ],
})
export class UserRegistrationComponent implements OnInit {
	fileToUpload: File;

	constructor() {}

	ngOnInit() {}
	@ViewChild('labelImport', { static: true })
	labelImport: ElementRef;

	onFileChange(files: FileList) {
		this.labelImport.nativeElement.innerText = Array.from(files).map((f) => f.name).join(', ');
		this.fileToUpload = files.item(0);
	}
}
