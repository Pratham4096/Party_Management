import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addressForm = this.fb.group({
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.address) {
      this.addressForm.patchValue(this.data.address);
    }
  }

  onSave() {
    if (this.addressForm.valid) {
      this.dialogRef.close(this.addressForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
