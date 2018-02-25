import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title = 'In';

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.navigate(['login']);
    this.router.events.subscribe(event => {
      this.title = this.router.url === '/login' ? 'In' : 'Up';
    });
  }

}
