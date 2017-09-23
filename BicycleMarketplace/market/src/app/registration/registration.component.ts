import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registeredUser: User = new User();
  confirmpw: string = "";
  errors: object;

  constructor(private authService: AuthService, private _router: Router ) { }

  ngOnInit() {
  }

  registerUser(form: NgForm) : void {
    console.log("In Register User")
    this.authService.register(form.value)
      .then(user => {
        console.log(user);
        form.reset();
        this.registeredUser = new User();
        this._router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.log(error);
        this.errors = error;
      
      });
    
  }

}
