import { Component, OnInit } from '@angular/core';
import { apiService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  users: any = {};
  constructor(public fetchApiData: apiService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.users = this.fetchApiData.getUser();
    console.log(this.users);
    // return this.users;
  }
}
