import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientNavbarComponent } from './components/patient-navbar/patient-navbar.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { PatientComponent } from './components/patient/patient.component';
import { NewPatientComponent } from './components/new-patient/new-patient.component';



const routes: Routes = [
  {
    path: 'newPt', component: NewPatientComponent
  },
  {
    path: '', component: PatientComponent,
    children: [
      { path: '', component: PatientsListComponent }
    ]
  }
];

@
NgModule({
  declarations: [
    PatientNavbarComponent,
    PatientsListComponent,
    PatientComponent,
    NewPatientComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientModule { }
