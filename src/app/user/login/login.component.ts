import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  // loginForm: FormGroup = new FormGroup({});
  emailControl = new FormControl(null, [
    Validators.required,
    Validators.email,
    Validators.minLength(6)
  ]);
  passwordControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(5)
  ]);
  
  loginForm = new FormGroup({
    'email': this.emailControl,
    'password': this.passwordControl
  });

  userSubscription = new Subscription();
  userLoginSubscription = new Subscription();

  errorMessage: string = '';

  loading = false;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user: User|null) => {
      if (user) {
        this.router.navigate(['home']);
        this.errorMessage = '';
      }
    });
  }
  
  onLogin() {
    if (this.loginForm?.value) {
      this.loading = true;
      this.userLoginSubscription = this.userService.login(this.loginForm.value)
          .pipe(
            catchError((error: Error) => {
              this.errorMessage = error.message;
              return throwError(error);
            })
          )
          .subscribe(
            (next) => this.errorMessage = '',
            (error) => this.loading = false,
            () => {
              this.loginForm.reset();
              this.loading = false;
            }
          );
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.userLoginSubscription) {
      this.userLoginSubscription.unsubscribe();
    }
  }

}
