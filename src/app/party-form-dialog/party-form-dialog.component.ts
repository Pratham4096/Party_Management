import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-party-form-dialog',
  template: `
     <h1 mat-dialog-title>{{ data.partyToEdit ? 'Edit Party' : 'Add New Party' }}</h1>
    <div mat-dialog-content>
      <app-party-form [partyToEdit]="data.partyToEdit" (partyAdded)="onPartyAdded()"></app-party-form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
    </div>
  `,
})
export class PartyFormDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PartyFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPartyAdded() {
    this.dialogRef.close();
  }
}
