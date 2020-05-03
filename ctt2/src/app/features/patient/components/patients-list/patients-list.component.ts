import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '@app/services/patient.service';
import { Patient } from '@app/models/patient';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<Patient>;

  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  pts$: Observable<Patient[]>;
  pts: Patient[];

  dataSource = new MatTableDataSource(this.pts);


  constructor(
    private patientService: PatientService
  ) { }

  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'dob',
    'nhsNo',
    'cpmsNo',
    'notes',
    'isOpen',
    'locality'
  ];

  ngOnInit(): void {
    // TODO get list of patients from service
    this.pts$ = this.patientService.getAllPts();
    this.pts$.subscribe(list => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.table.dataSource = this.dataSource;
    });
  }

  showPt(pt: Patient) {
    // this.store.dispatch(new SetSelectedUser(user));
    // this.router.navigateByUrl('/admin/user');
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


}
