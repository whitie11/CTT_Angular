import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateWhitespace } from '@app/utilities/validators';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-store.module';
import { Locality } from '@app/models/locality';
import { Observable } from 'rxjs';
import { getLocalityList } from '@app/store/selectors/list.selectors';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  ptForm: FormGroup;

  localities: Locality[];
  localities$: Observable<Locality[]>;

  NHSNoValidator = /^(\d{3}) ?(\d{3}) ?(\d{4})$/g;
  DobValidator = /^(\d{2})\/(\d{2})\/(\d{4})/g;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {

  }

  ngOnInit(): void {
    this.reactiveForm();
    this.localities$ = this.store.select(getLocalityList);
    this.localities$.subscribe(l => this.localities = l);
  }



  reactiveForm() {
    this.ptForm = this.fb.group({
      firstName: ['', [Validators.required, validateWhitespace]],
      lastName: ['', [Validators.required, validateWhitespace]],
      dob: ['', [Validators.required ]],
      nhsNo: ['', [Validators.required, Validators.pattern(this.NHSNoValidator) ]],
      cpmsNo: [''],
      locality: ['', [Validators.required]],
      notes: ['']
    });
  }

  update(data) {

  }

  cancel() { }
}
