import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PartyFormDialogComponent } from '../party-form-dialog/party-form-dialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router, public dialog: MatDialog) {}

  openAddParty(): void {
    const dialogRef = this.dialog.open(PartyFormDialogComponent, {
      width: '400px',
      data: {} // Pass any data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Refresh the party list if needed
    });
  }

  openEditParty(party: any): void {
    const dialogRef = this.dialog.open(PartyFormDialogComponent, {
      width: '400px',
      data: { partyToEdit: party }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Refresh the party list if needed
    });
  }

  logout() {
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
