import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {

  warningMessage: string = 'Voulez-vous vraiment vous déconnecter ?';
  OK: string = 'OUI';

  userSubscription = new Subscription();
  userLogoutSubscription = new Subscription();

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user: User|null) => {
      if (!user) {
        this.router.navigate(['']);
      }
    });
  }

  onLogout() {
    this.userLogoutSubscription = this.userService.logout()
        .subscribe(response => {
          if (response) {
            this.router.navigate(['']);
          }
        });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.userLogoutSubscription) {
      this.userLogoutSubscription.unsubscribe();
    }
  }

}
