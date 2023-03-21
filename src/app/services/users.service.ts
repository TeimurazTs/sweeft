import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ResponseData } from '../shared/responseData.module';
import { User } from '../shared/user.module';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/'

  page = 1;
  friendsPage = 1;
  itemsPerPage = 20;

  profile!: User;

  constructor(
    private http: HttpClient
  ) { }

  fetchUsers() {
    return this.http.get<ResponseData>(`${this.apiUrl}${this.page}/${this.itemsPerPage}`);
  }

  fetchFriends(userProfile: User) {
    return this.http.get<ResponseData>(`${this.apiUrl}${userProfile.id}/friends/${this.friendsPage}/${this.itemsPerPage}`);
  }

  fetchUserProfile(userProfile: User) {
    return this.http.get<User>(`${this.apiUrl}${userProfile.id}`);
  }
}