import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['admin@tradeflow.com', [Validators.required, Validators.email]],
      password: ['admin123', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email, password);

    if (!success) {
      this.errorMessage = 'Invalid email or password';
      return;
    }

    const role = this.authService.getRole();

    switch (role) {
      case 'ADMIN':
      case 'MANAGER':
        this.router.navigate(['/dashboard']);
        break;

      case 'USER':
        this.router.navigate(['/shipments']);
        break;

      default:
        this.router.navigate(['/auth/login']);
    }
  }
  
}
