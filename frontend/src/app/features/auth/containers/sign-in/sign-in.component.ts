import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApi } from '../../apis/auth.api';
import { AuthFacade } from '../../facades/auth.facades';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'feature-sign-in',
  templateUrl: './sign-in.component.html',
  providers: [AuthFacade, AuthApi],
})
export class SignInComponent implements OnInit {
  public signInForm!: FormGroup;
  public errorMessage: string | null = null;
  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authFacade: AuthFacade,
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  logIn(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    const { email, password } = this.signInForm.value;

    this.authFacade.signIn(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/companies']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message ?? 'Invalid credentials';
      },
    });
  }
}
