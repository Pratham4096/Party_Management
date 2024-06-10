import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog} from '@angular/material/dialog';
import { BankFormComponent } from '../bank-form/bank-form.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-party-info-dialog',
  templateUrl: './party-info-dialog.component.html',
  styleUrls: ['./party-info-dialog.component.css']
})
export class PartyInfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PartyInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private dialog: MatDialog ,private snackBar: MatSnackBar) {
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
              this.data.bankId.push(result);
              
              this.snackBar.open('Bank Updated successfully', 'Close', { duration: 3000 });
            }
          } else {
            // Add new bank
            this.data.bankId.push(result);
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
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }