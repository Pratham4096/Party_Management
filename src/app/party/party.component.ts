import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartyFormDialogComponent } from '../party-form-dialog/party-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PartyInfoDialogComponent } from '../party-info-dialog/party-info-dialog.component';


@Component({
  selector: 'app-party',
  templateUrl:'./party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  parties: any[] = [];
  
  displayedColumns: string[] = [
    'actions',
    'id',
    'info',
    // 'bank_id',
    // 'address',
    // 'userid',
    'login_access',
    'name',
    'company_name',
    'mobile_no',
    'telephone_no',
    'whatsapp_no',
    'email',
    'remark',
    'date_of_birth',
    'anniversary_date',
    'gstin',
    'pan_no',
    'apply_tds',
    'credit_limit',
    'is_active',
    'image'
  ];
  

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadParties();
  }

  loadParties() {
    this.authService.getAllParties().subscribe({
      next: data => {
        this.parties = data;
      },
      error: () => {
        this.snackBar.open('Error loading parties', 'Close', { duration: 3000 });
      }
    });
  }

  openInfoDialog(party: any): void {
    this.dialog.open(PartyInfoDialogComponent, {
      width: '600px',
      data: { bankId: party.bank_id, address: party.address }
    });
  }

  editParty(party: any) {
    const dialogRef = this.dialog.open(PartyFormDialogComponent, {
      width: '400px',
      data: { partyToEdit: party }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadParties(); // Refresh the party list if needed
    });
  }

  deleteParty(party: any) {
    const partyId = party.id;
    console.log('Deleting party with id:', partyId);  // Log the ID
    if (confirm('Are you sure you want to delete this party?')) {
      this.authService.deleteParty(partyId).subscribe({
        next: () => {
          this.snackBar.open('Party deleted successfully', 'Close', { duration: 3000 });
          this.loadParties();
        },
        error: (err) => {
          console.error('Error deleting party:', err);  // Log the error details
          this.snackBar.open('Error deleting party', 'Close', { duration: 3000 });
        }
      });
    }
  }
}