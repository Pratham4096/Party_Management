import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog} from '@angular/material/dialog';
import { BankFormComponent } from '../bank-form/bank-form.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-party-info-dialog',
  templateUrl: './party-info-dialog.component.html',
  styleUrls: ['./party-info-dialog.component.css']
})
export class PartyInfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PartyInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private dialog: MatDialog ,private snackBar: MatSnackBar , private authService:AuthService) {
      if (!this.data.bankId) {
        this.data.bankId = [];
      }
      if (!this.data.address) {
        this.data.address = [];
      }
    }

    openBankForm(bank?: any) {
      const dialogRef = this.dialog.open(BankFormComponent, {
        width: '400px',
        data: { bank }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Handle the result to add or update the bank data
          if (bank) {
            // Update existing bank
            const index = this.data.bankId.indexOf(bank);
            if (index !== -1) {
              this.data.bankId[index] = result;
              
              
              this.snackBar.open('Bank Updated successfully', 'Close', { duration: 3000 });
            }
          } else {
            // Add new bank
            this.data.bankId.push(result);
            console.log("success")
          }
        }
      });
    }
  
    openAddressForm(address?: any) {
      const dialogRef = this.dialog.open(AddressFormComponent, {
        width: '400px',
        data: { address }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Handle the result to add or update the address data
          if (address) {
            // Update existing address
            const index = this.data.address.indexOf(address);
            if (index !== -1) {
              this.data.address[index] = result;
              this.snackBar.open('Address Updated successfully', 'Close', { duration: 3000 });
            }
          } else {
            // Add new address
            this.data.address.push(result);
          }
        }
      });
    }

    savePartyData() {
      const partyData = {
        bank: this.data.bankId,
        address: this.data.address
      };
  
      this.authService.patchParty(this.data.id, partyData).subscribe({
        next: () => {
          this.snackBar.open('Party data updated successfully', 'Close', { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open('Error updating party data', 'Close', { duration: 3000 });
        }
      });
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }