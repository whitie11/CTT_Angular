import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DiaryComponent } from './components/diary/diary.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromDiary from './state';
import { DiaryEffects } from './state/diary.effects';
import { ApptEditComponent } from './components/appt-edit/appt-edit.component';



const routes: Routes = [
  {
    path: 'appt_edit/:Id', component: ApptEditComponent,
    // children: [
    //   { path: '',  }
    // ]
  },
  {
    path: '', component: DiaryComponent,
    children: [
      { path: '',  }
    ]
  }

];

@
NgModule({
  declarations: [
    DiaryComponent,
    ApptEditComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('diary', fromDiary.reducers),
    EffectsModule.forFeature([DiaryEffects])
  ]
})

export class DiaryModule { }
