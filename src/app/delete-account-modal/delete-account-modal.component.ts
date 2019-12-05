import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-delete-account-modal',
	templateUrl: './delete-account-modal.component.html',
	styleUrls: [ './delete-account-modal.component.scss' ],
})
export class DeleteAccountModalComponent implements OnInit {
	constructor(private dialogRef: MatDialogRef<DeleteAccountModalComponent>, private auth: AuthService) {
		dialogRef.disableClose = true;
	}

	ngOnInit() {}

	onNoClick() {
		this.dialogRef.close();
	}

	onYesClick() {
		// mudar pra pasta deleted
		this.dialogRef.close();
	}
}
