import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { User } from './shared/user.module'
import { UsersService } from './services/users.service';
import { ResponseData } from './shared/responseData.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sweeft';
}