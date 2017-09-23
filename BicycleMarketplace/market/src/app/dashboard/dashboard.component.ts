import { Component, OnInit } from '@angular/core';
import { TitilizePipe } from '../titilize.pipe';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TitilizePipe]
})
export class DashboardComponent implements OnInit {
  user: User = new User();
  users: Array<User> = [];

  constructor(private titilize: TitilizePipe, private authService: AuthService, private _router: Router) { }

  ngOnInit() {
    if(!this.authService.isAuthorized()){
      this._router.navigate(['']);
    }
    this.titleCaseUsers();
  }

  titleCaseUsers(): void {
    this.users.forEach(user => {
      this.user.firstName = this.titilize.transform(user.firstName);
      this.user.lastName = this.titilize.transform(user.lastName);
    });
  }

}
