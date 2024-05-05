import { Component, EventEmitter, Input, Output, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '@app/core/services/auth.service';
import { AuthStore } from '../store/auth.store';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  private _authStore = inject(AuthStore);

  public form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public OnInit() {
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this._authStore);
      console.log('books state changed', state);
    });
  }

  submit() {
    if (this.form.valid) {
      this._authStore.login(this.form.value);
    }
  }
  @Input()
  error!: string | null;

  @Output() submitEM = new EventEmitter();

}
