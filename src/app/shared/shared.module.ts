import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { FormFieldComponent } from './form-field/form-field.component';



@NgModule({
  declarations: [
    LoadingComponent,
    FormFieldComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
