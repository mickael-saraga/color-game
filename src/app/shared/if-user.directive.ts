import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../user/models/user';
import { UserService } from '../user/user.service';

@Directive({
  selector: '[ifUser]'
})
export class IfUserDirective implements OnInit, OnDestroy {

  userSubscription = new Subscription();

  constructor(protected elementRef: ElementRef,
              protected renderer: Renderer2,
              protected userService: UserService) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user: User|null) => {
      this.update(user);
    });
  }

  protected update(user: User|null) {
    if (user) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'd-none');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'd-none');
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
