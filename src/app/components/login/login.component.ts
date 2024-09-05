import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { PocketAuthService } from '@app/services/auth-pocketbase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@app/services/global-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Importar ReactiveFormsModule y CommonModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    public global:GlobalService,
    private authService: PocketAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Usamos aserción de tipos para asegurar a TypeScript que estos métodos siempre devuelven un FormControl
  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.loginUser(email, password).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          localStorage.setItem('isLoggedin', 'true');
          this.global.setRoute('home');
        },
        error: (error) => {
          console.error('Error en el inicio de sesión', error);
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        }
      });
    }
  }
}
