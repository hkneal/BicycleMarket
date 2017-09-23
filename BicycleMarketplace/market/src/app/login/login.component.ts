import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedInUser: User = new User();
  errors: object;
  loginAttempts: number = 0;
  loading = false;
  blocked = false;

  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm): void{
    if(!this.authService.isBlocked()){
      this.loading = true;
      console.log("In Login User");
      // console.log(form.value);
      this.authService.login(form.value)
        .then(user => {
          this.blocked = false;
          this.loginAttempts = 0;
          console.log(user);
          form.reset();
          this.loggedInUser = new User();
          this._router.navigate(['/dashboard']);
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
          this.loginAttempts += 1;
          if(this.loginAttempts >= 5){
            this.authService.blockUser(form.value)
              .then(user => {
                console.log('User Blocked!');
                this.blocked = true;
              })
          }
          this.errors = error;
        });
      } else console.log("User Blocked!")
  }

}
