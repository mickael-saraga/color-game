import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingComponent } from './loading/loading.component';
import { FormFieldComponent } from './form-field/form-field.component';



@NgModule({
  declarations: [
    LoadingComponent,
    FormFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    LoadingComponent
  ]
})
export class SharedModule { }
