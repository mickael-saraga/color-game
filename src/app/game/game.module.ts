import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

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
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    NewComponent,
    CaseComponent,
    RouterModule
  ]
})
export class GameModule { }
