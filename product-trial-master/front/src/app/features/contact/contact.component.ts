import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [
    CommonModule,           
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ]
})
export class ContactComponent {
  sent = false;

  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.maxLength(300)]]
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.sent = true;
      console.log(this.form.value);
    }
  }
}
