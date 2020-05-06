import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateWhitespace } from '@app/utilities/validators';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-store.module';
import { Locality } from '@app/models/locality';
import { Observable, from, throwError } from 'rxjs';
import { getLocalityList } from '@app/store/selectors/list.selectors';
import { Patient, PtEditDTO } from '@app/models/patient';
import { PatientService } from '@app/services/patient.service';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  ptForm: FormGroup;

  localities: Locality[];
  localities$: Observable<Locality[]>;

  NHSNoValidator = /^(\d{3}) ?(\d{3}) ?(\d{4})$/g;
  DobValidator = /^(\d{2})\/(\d{2})\/(\d{4})/g;
  errors: any;
  state: any;
  activatedRoute: any;



  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.state = this.router.getCurrentNavigation().extras.state.data;
  }

  ngOnInit(): void {
    this.reactiveForm();
    this.localities$ = this.store.select(getLocalityList);
    this.localities$.subscribe(l => this.localities = l);
  }



  reactiveForm() {
    this.ptForm = this.fb.group({
      patientId: [this.state.patientId],
      firstName: [this.state.firstName, [Validators.required, validateWhitespace]],
      lastName: [this.state.lastName, [Validators.required, validateWhitespace]],
      dob: [this.state.dob, [Validators.required]],
      nhsNo: [this.state.nhsNo, [Validators.required, Validators.pattern(this.NHSNoValidator)]],
      cpmsNo: [this.state.cpmsNo],
      localityId: [this.state.localityId, [Validators.required]],
      notes: [this.state.notes],
      isOpen: [this.state.isOpen]
    });
  }

  update(data: Patient) {
    const editData = {
      patientId: data.patientId,
      localityId: data.localityId,
      notes: data.notes,
      isOpen: data.isOpen
    };
    const res = this.patientService.Update(editData).subscribe(
      result => {
        // Handle result
        console.log(result);
      },
      error => {
        this.errors = error;
        this.snackBar.open(error, 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        this.snackBar.open('Patient successfully updated to Database', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.router.navigateByUrl('/patients');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/patients');
  }
}
