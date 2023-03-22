import { Component, ElementRef, HostListener } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ResponseData } from '../shared/responseData.module';
import { User } from '../shared/user.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  users: User[] = [];

  ngOnInit() {
    this.fetchUsers()
  }

  fetchUsers() {
    this.userService.fetchUsers().subscribe(
      (response: ResponseData) => {
        this.users = [...this.users, ...response.list]
      }
    )
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const isScrolledToBottom = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight;
  
    if (isScrolledToBottom) {
      this.userService.page++;
      this.fetchUsers();
    }
  }
}
