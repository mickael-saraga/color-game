import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingComponent } from './loading/loading.component';
import { FormFieldComponent } from './form-field/form-field.component';

import { IfUserDirective } from './if-user.directive';
import { IfNoUserDirective } from './if-no-user.directive';



@NgModule({
  declarations: [
    FormFieldComponent,
    IfUserDirective,
    IfNoUserDirective,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    IfUserDirective,
    IfNoUserDirective,
    LoadingComponent
  ]
})
export class SharedModule { }
