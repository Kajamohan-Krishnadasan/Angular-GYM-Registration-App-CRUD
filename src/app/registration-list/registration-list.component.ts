import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
})
export class RegistrationListComponent implements OnInit {
  public dataSource!: MatTableDataSource<User>;

  // Store all the users
  public users!: User[];

  // Columns to be displayed in the table
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    'bmiResult',
    'gender',
    'package',
    'enquiryDate',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private router: Router,
    private toast: NgToastService,
    private confirm: NgConfirmService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.getRegisterUser().subscribe((res) => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // route to edit page
  edit(id: number) {
    this.router.navigate(['update', id]);
  }

  // delete the user
  delete(id: number) {
    this.confirm.showConfirm(
      'Are you sure you want to delete this user?',
      () => {
        this.api.deleteRegisterUser(id).subscribe((res) => {
          this.toast.success({
            detail: 'Success',
            summary: 'User deleted successfully',
            duration: 3000,
          });
          this.getUsers();
        });
      },
      () => {
        
      }
    );
  }
}
