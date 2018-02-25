import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../shared/models/user.model';
import { UsersService } from '../../shared/services/users.service';
import { Notice } from '../../shared/models/notice.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  notice: Notice;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.notice = new Notice('danger', '');

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['canLogin']) {
          this.showNotice('success', 'Now you can Log in :)');
        }
      });

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.notice.text = '';
            this.authService.login();
            window.localStorage.setItem('user', JSON.stringify(user));
            // this.router.navigate(['/dashboard']);
          } else {
            this.showNotice('warning', 'Password is wrong!!!');
          }
        } else {
          this.showNotice('danger', 'No user with such email!!!');
        }
      }
    );
  }

  showNotice (type: string, text: string) {
    this.notice = new Notice(type, text);
    window.setTimeout(() => {
      this.notice.text = '';
    }, 5000);
  }

}
