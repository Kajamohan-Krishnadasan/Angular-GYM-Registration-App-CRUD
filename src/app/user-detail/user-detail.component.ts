import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public userId!: number;
  userDetail!: User;

  constructor(private activateRoute: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((val) => {
      this.userId = val['id'];
      this.fetchUserDetalis(this.userId);
    });
  }

  fetchUserDetalis(id: number) {
    this.api.getRegisterUserById(id).subscribe((res) => {
      this.userDetail = res;
    });
  }
}
