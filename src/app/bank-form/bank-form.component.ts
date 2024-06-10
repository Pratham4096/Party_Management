import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent implements OnInit {
  bankForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BankFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bankForm = this.fb.group({
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_no: ['', Validators.required],
      bank_ifsc_code: ['', Validators.required],
      account_holder_name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.bank) {
      this.bankForm.patchValue(this.data.bank);
    }
  }

  onSave() {
    if (this.bankForm.valid) {
      this.dialogRef.close(this.bankForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
