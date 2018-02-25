import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable()

export class UsersService {
    constructor(
        private http: HttpClient
    ) {}

    getUserByEmail(email: string): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/users?email=${email}`)
            .pipe(
                map(users => users[0]),
                tap(h => {
                    const outcome = h ? `user` : `did not find`;
                    console.log(`${outcome} email=${email}`);
                })
            );
    }

    createNewUser(user: User): Observable<User> {
        return this.http.post<User>('http://localhost:3000/users', user)
            .pipe(
                tap((hero: User) => console.log(`added user w/ id=${user.name}`))
            );
    }
}
