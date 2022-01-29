import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../user/models/user';
import { UserService } from '../user/user.service';
import { IfUserDirective } from './if-user.directive';

@Directive({
  selector: '[ifNoUser]'
})
export class IfNoUserDirective extends IfUserDirective implements OnInit, OnDestroy {

  userSubscription = new Subscription();

  constructor(elementRef: ElementRef,
              renderer: Renderer2,
              userService: UserService) {
    super(elementRef,
          renderer,
          userService);
  }
  
  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user: User|null) => {
      this.update(user);
    });
  }
  
  protected update(user: User|null) {
    if (user) {
      this.renderer.addClass(this.elementRef.nativeElement, 'd-none');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'd-none');
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
