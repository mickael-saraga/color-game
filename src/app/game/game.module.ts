import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NewComponent } from './new/new.component';
import { CaseComponent } from './case/case.component';


const routes: Routes = [
  {
    path: '', children: [
      { path: 'new', component: NewComponent }
    ]
  }
];

@NgModule({
  declarations: [
    NewComponent,
    CaseComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    RouterModule,
    NewComponent,
    CaseComponent
  ]
})
export class GameModule { }
