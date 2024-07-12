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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.loginForm.valid) {
      let loginClick = true;
      let LoginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(LoginModel).subscribe(
        (response) => {
          console.log("1")
          this.toastrService.info(response.message);
          this.toastrService.success("Giriş Yapıldı");
          localStorage.setItem('token', response.data.token);
          loginClick = true;
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
      if(loginClick){
        this.authService.getClaims(LoginModel).subscribe(
          (response) => {
            console.log("2")
            for(let i=0; i<response.length; i++){
              this.toastrService.warning("Hesap rolü: " + response[i].name);    
              this.authService.setUserClaims(response[i].name); 
            loginClick=false;         
            }
          }
        );
      }
    }
  }
}
