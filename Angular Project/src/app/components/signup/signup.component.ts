import { LoginModel } from './../../models/loginModel';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  signup() {
    if (this.signupForm.valid) {
      let signupModel = Object.assign({}, this.signupForm.value);
      this.authService.signUp(signupModel).subscribe(
        (response) => {
          this.toastrService.info("Kayıt Başarılı");
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }
}
