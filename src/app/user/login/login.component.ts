import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  emailControl = new FormControl(UserService.defaultEmailValue, [
    Validators.required,
    Validators.email,
    Validators.minLength(6)
  ]);
  passwordControl = new FormControl(UserService.defaultPasswordValue, [
    Validators.required,
    Validators.minLength(5)
  ]);
  
  loginForm = new FormGroup({
    'email': this.emailControl,
    'password': this.passwordControl
  });
    
  isDistantAuthentication: boolean = false;
  mockedEmailType = new FormControl(this.isDistantAuthentication);
  
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

  get placeholderValidEmails(): string[] {
    return this.userService.placeholderValidEmails;
  }

  changeMockingEmailStatus() {
    this.isDistantAuthentication = this.mockedEmailType.value;
    if (!this.isDistantAuthentication) {
      this.loginForm.setValue({
        'email': UserService.defaultUsernameValue,
        'password': UserService.defaultPasswordValue
      });
    }
  }
  
  onLogin() {
    if (this.loginForm?.value) {
      this.loading = true;
      let userLoginAuthentication$ = new Observable();
      if (this.isDistantAuthentication) {
        userLoginAuthentication$ = this.userService.loginDistant(this.loginForm.value);
      } else {
        userLoginAuthentication$ = this.userService.login(this.loginForm.value);
      }
      this.userLoginSubscription = userLoginAuthentication$
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

  selectValidMockEmail(email: string) {
    this.loginForm.patchValue({
      email
    });
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
