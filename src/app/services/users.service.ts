import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ResponseData } from '../shared/responseData.module';
import { fullProfile } from '../shared/fullProfile.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/'

  page = 1;
  friendsPage = 1;
  itemsPerPage = 20;

  constructor(
    private http: HttpClient
  ) { }

  fetchUsers() {
    return this.http.get<ResponseData>(`${this.apiUrl}${this.page}/${this.itemsPerPage}`);
  }

  fetchFriends(userId: string) {
    return this.http.get<ResponseData>(`${this.apiUrl}${userId}/friends/${this.friendsPage}/${this.itemsPerPage}`);
  }

  fetchUserProfile(userId: string) {
    return this.http.get<fullProfile>(`${this.apiUrl}${userId}`);
  }
}