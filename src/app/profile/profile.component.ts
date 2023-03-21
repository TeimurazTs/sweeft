import { Component, OnInit, HostListener, DoCheck } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../shared/user.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UsersService
  ) { }

  profiles: User[] = [];
  profile!: User;

  ngOnInit() {
    this.profile = this.userService.profile
    this.fetchFriends(this.userService.profile)
  }

  fetchFriends(userProfile: User) {
    this.userService.fetchFriends(userProfile).subscribe(
      (data) => {
        this.profiles = [...this.profiles, ...data.list]
      }
    )
  }

  userCliked(user: User) {
    this.userService.profile = user;
    this.profiles = [];
    this.fetchUserProfile(user);
    this.fetchFriends(user);
  }

  fetchUserProfile(userProfile: User) { 
    this.userService.fetchUserProfile(userProfile).subscribe(
      (data) => {
        this.profile = data;
      }
    )
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom + 1 >= docHeight) {
      this.userService.friendsPage++;
      this.fetchFriends(this.userService.profile)
    }
  }
}