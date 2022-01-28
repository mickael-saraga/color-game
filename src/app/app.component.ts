import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from './user/models/user';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'Color Game';
  username: string|null = null;

  userSubscription = new Subscription();

  constructor(private userservice: UserService) { }
  
  ngOnInit(): void {
    this.userservice.user$.subscribe((user: User|null) => {
      this.username = user ? user.username : null;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
