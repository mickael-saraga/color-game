import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  {
    path: '', children: [
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    LoginComponent,
    LogoutComponent
  ]
})
export class UserModule { }
