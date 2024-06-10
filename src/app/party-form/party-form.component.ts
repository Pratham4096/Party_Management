import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, formatDate } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-party-form',
  templateUrl: './party-form.component.html',
  styleUrls: ['./party-form.component.css']
})
export class PartyFormComponent implements OnInit {
  @Output() partyAdded = new EventEmitter<void>();
  @Input() partyToEdit: any; // New Input property to accept party data for editing

  partyForm: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.partyForm = this.fb.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      mobile_no: ['', Validators.required],
      telephone_no: [''],
      whatsapp_no: [''],
      email: ['', [Validators.required, Validators.email]],
      remark: [''],
      date_of_birth: [''],
      anniversary_date: [''],
      gstin: ['',[Validators.required]],
      pan_no: [''],
      apply_tds: [false],
      credit_limit: [0, [Validators.required, Validators.min(0)]],
      is_active: [true],
      image: [null]
    });
  }

  ngOnInit(): void {
    if (this.partyToEdit) {
      this.loadPartyData(this.partyToEdit);
    }
  }

  loadPartyData(party: any) {
    this.partyForm.patchValue({
      name: party.name,
      company_name: party.company_name,
      mobile_no: party.mobile_no,
      telephone_no: party.telephone_no,
      whatsapp_no: party.whatsapp_no,
      email: party.email,
      remark: party.remark,
      date_of_birth: party.date_of_birth,
      anniversary_date: party.anniversary_date,
      gstin: party.gstin,
      pan_no: party.pan_no,
      apply_tds: party.apply_tds,
      credit_limit: party.credit_limit,
      is_active: party.is_active,
      image: null // Reset image input
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      this.partyForm.patchValue({
        image: this.selectedImage
      });
    }
  }

  onSubmit() {
    if (this.partyForm.valid) {
      const formData = new FormData();
      Object.keys(this.partyForm.controls).forEach(key => {
        if (key !== 'image') {
          formData.append(key, this.partyForm.get(key)?.value);
        }
      });

      Object.keys(this.partyForm.controls).forEach(key => {
        if (key === 'date_of_birth' || key === 'anniversary_date') {
          formData.append(key, formatDate(this.partyForm.get(key)?.value));
        } else if (key !== 'image') {
          formData.append(key, this.partyForm.get(key)?.value);
        }
      });

      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }

      if (this.partyToEdit) {
        // Update existing party
        console.log("EditParty")
        this.authService.updateParty(this.partyToEdit.id, formData).subscribe({
          next: () => {
            this.snackBar.open('Party updated successfully', 'Close', { duration: 3000 });
            this.partyForm.reset();
            this.selectedImage = null;
            this.partyAdded.emit(); // Emit the event when a party is updated
          },
          error: (err) => {
            this.snackBar.open('Error updating party', 'Close', { duration: 3000 });
          }
        });
      } else {
        // Create new party
        this.authService.createParty(formData).subscribe({
          next: () => {
            this.snackBar.open('Party created successfully', 'Close', { duration: 3000 });
            this.partyForm.reset();
            this.selectedImage = null;
            this.partyAdded.emit(); // Emit the event when a party is added
          },
          error: (err) => {
            this.snackBar.open('Error creating party', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }
}
