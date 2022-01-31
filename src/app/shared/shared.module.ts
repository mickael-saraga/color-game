import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LoadingComponent } from './loading/loading.component';
import { FormFieldComponent } from './form-field/form-field.component';

import { IfUserDirective } from './if-user.directive';
import { IfNoUserDirective } from './if-no-user.directive';
import { InputFormControlDirective } from './input-form-control.directive';



@NgModule({
  declarations: [
    FormFieldComponent,
    IfUserDirective,
    IfNoUserDirective,
    InputFormControlDirective,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormFieldComponent,
    IfUserDirective,
    IfNoUserDirective,
    InputFormControlDirective,
    LoadingComponent
  ]
})
export class SharedModule { }
