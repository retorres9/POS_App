import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Login } from './models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  loginForm: FormGroup;
  showAlert: boolean = false;
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username : new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  login() {
    const formValues = this.loginForm.value;
    const user = new Login(formValues.username, formValues.password);
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.loginService.login(user).subscribe(resp => {
        console.log(resp);

        if (resp[0].password !== '') {
          this.router.navigate(['home']);
        } else if (resp[0].password === '') {
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          },  2000);
        }
      })
    }, 1500);
  }

}
