import { Component, OnInit, HostListener, DoCheck } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../shared/user.module';
import { fullProfile } from '../shared/fullProfile.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
  ) { }

  profiles: User[] = [];
  fullProfile!: fullProfile;

  userId = this.route.snapshot.paramMap.get('id') as string;

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.userId = params['id']
      }
    )
    this.fetchUserProfile(this.userId)
    this.fetchFriends(this.userId)
  }

  fetchFriends(userId: string) {
    this.userService.fetchFriends(userId).subscribe(
      (data) => {
        this.profiles = [...this.profiles, ...data.list]
      }
    )
  }

  userCliked(usedId: string) {
    this.profiles = [];
    this.fetchUserProfile(usedId);
    this.fetchFriends(usedId);
  }

  fetchUserProfile(userId: string) {
    this.userService.fetchUserProfile(userId).subscribe(
      (data) => {
        this.fullProfile = data;
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
      this.fetchFriends(this.userId)
    }
  }
}