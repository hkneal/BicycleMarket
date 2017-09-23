import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent implements OnInit {

  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.logoff();
  }

  logoff():void{
    this.authService.logout()
      .then(() => {
        this._router.navigate(['']);
      })
  }
}
