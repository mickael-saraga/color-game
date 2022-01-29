import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, skip, switchMap, tap } from 'rxjs/operators';

import { Credentials } from './models/credentials';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly storageKey = 'user';
  private static readonly delay = 800;
  private userSubject: BehaviorSubject<User|null>;

  public static readonly defaultUsernameValue = 'JohnDoe';
  public static readonly defaultEmailValue = 'john@doe';
  public static readonly defaultPasswordValue = 'abcde';

  private static readonly placeholderURL = 'https://jsonplaceholder.typicode.com/users';

  private validUsersEmails = [
    'Sincere@april.biz',
    'Shanna@melissa.tv',
    'Nathan@yesenia.net',
    'Julianne.OConner@kory.org',
    'Lucio_Hettinger@annie.ca',
    'Karley_Dach@jasper.info',
    'Telly.Hoeger@billy.biz',
    'Sherwood@rosamond.me',
    'Chaim_McDermott@dana.io',
    'Rey.Padberg@karina.biz',
  ];

  constructor(private http: HttpClient) {
    const storedUser = JSON.parse(localStorage.getItem(UserService.storageKey) || 'null');
    this.userSubject = new BehaviorSubject<User|null>(storedUser);
    this.userSubject.pipe(
      skip(1), // skip first emission
      tap(user => localStorage.setItem(UserService.storageKey, JSON.stringify(user)))
    ).subscribe();
  }

  getUsers() {
    return this.http.get(UserService.placeholderURL);
  }

  get user(): User|null {
    return this.userSubject.value;
  }

  get user$(): Observable<User|null> {
    return this.userSubject.asObservable();
  }

  get placeholderValidEmails(): string[] {
    return this.validUsersEmails;
  }

  loginDistant(credentials: Credentials): Observable<User> {
    let obs: Observable<User>;
    return this.http.get(UserService.placeholderURL + '?email=' + credentials.email)
               .pipe(switchMap((userData: any) => {
                   if (userData[0]?.id) {
                     obs = of({
                       id: userData[0].id,
                       username: userData[0].username
                     });
                   } else {
                     obs = throwError(new Error('Invalid Credentials'));
                   }
                   return obs.pipe(
                     delay(UserService.delay), // simulate API
                     tap(user => this.userSubject.next(user))
                   );
               }));
  }

  login({ email, password }: Credentials): Observable<User> {
    let obs: Observable<User>;
    if (email === UserService.defaultEmailValue && password === UserService.defaultPasswordValue) {
      obs = of({
        id: '5fc62fdb5eb04def08ac913a',
        username: UserService.defaultUsernameValue
      });
    } else {
      obs = throwError(new Error('Invalid Credentials'));
    }
    return obs.pipe(
      delay(UserService.delay), // simulate API
      tap(user => this.userSubject.next(user))
    );
  }

  logout(): Observable<boolean> {
    return of(true).pipe(
      delay(UserService.delay), // simulate API
      tap(() => this.userSubject.next(null))
    );
  }
}
