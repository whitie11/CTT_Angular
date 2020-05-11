import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Appt } from '@app/models/appt';
import { Clinic } from '@app/models/clinic';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DiaryState } from '../../state/diary.reducer';
import { getClinicList } from '@app/store/selectors/list.selectors';

@Component({
  selector: 'app-appt-new',
  templateUrl: './appt-new.component.html',
  styleUrls: ['./appt-new.component.scss']
})
export class ApptNewComponent implements OnInit {

  state: any;
  activatedRoute: any;
  apptForm: FormGroup;
  selectedClinic: string;
  clinics: Clinic[];
  clinics$: Observable<Clinic[]>;
  dateStr: string;
  timeStr: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<DiaryState>,
  ) {
    this.state = this.router.getCurrentNavigation().extras.state.appt;
    this.clinics$ = this.store.select(getClinicList);
    this.clinics$.subscribe(l => this.clinics = l);

   }

  ngOnInit(): void {
    this.reactiveForm();
    const cl = this.clinics.find(c => c.clinicId === this.state.clinicId);
    this.selectedClinic = cl.clinicName + '(' + this.state.clinicGroup + ')';
    this.dateStr = this.getDateString(this.state.date);
    this.timeStr = this.state.timeSlot;
  }

  getDateString(date: Date) {
    const d = new Date(date);
    return d.toLocaleDateString();
  }


  reactiveForm() {
    this.apptForm = this.fb.group({
      apptId: [0],
      date: [this.state.date],

      timeSlotId: [this.state.timeSlot],
      clinicId: [this.state.clinicId],
      notes: [''],
      patientId: ['', [Validators.required]],
      stageId: [1],
      typeId: ['', [Validators.required]],
      clinicGroup: [this.state.group]
    });
  }

  save(newAppt: Appt){

  }

}
