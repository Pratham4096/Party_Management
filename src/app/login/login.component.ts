import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  token:string='';

  // constructor(private authService: AuthService ,private router: Router) { }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  onLogin() {
    if (this.loginForm.valid) {
      this.http.post<any>('https://ap.greatfuturetechno.com/login/', this.loginForm.value)
        .subscribe(
          response => {
            localStorage.setItem('authToken', response.token); // Store token in localStorage
            this.router.navigate(['/dashboard']); // Redirect to dashboard
            this.snackBar.open('Login successful', 'Close', { duration: 3000 });
          },
          error => {
            this.snackBar.open('Login failed' , 'Close', { duration: 3000 });
          }
        );
    }
  }
}
