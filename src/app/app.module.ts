import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from
'@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PartyComponent } from './party/party.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule, _MatTableDataSource } from '@angular/material/table';
import { MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCommonModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './services/auth.service';
import { AuthinterceptorService } from './authinterceptor.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { PartyFormComponent } from './party-form/party-form.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { PartyFormDialogComponent } from './party-form-dialog/party-form-dialog.component';
import { PartyInfoDialogComponent } from './party-info-dialog/party-info-dialog.component';
import { BankFormComponent } from './bank-form/bank-form.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PartyComponent,
    PartyFormComponent,
    PartyFormDialogComponent,
    PartyInfoDialogComponent,
    BankFormComponent,
    AddressFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgbNavModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    
    
  ],
  providers: [ AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorService, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
