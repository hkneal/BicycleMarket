import { Component } from '@angular/core';
import { Bike } from './bike';
import { BicycleService } from './services/bicycle.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  bikeList: Array<Bike> = [];
  myBikeList: Array<Bike> = [];
  
  constructor(private _bikeService: BicycleService){
    this._bikeService.updateBikes(this.bikeList);
    this._bikeService.bikesObservable.subscribe( ( bikes ) => {
      this.bikeList = bikes;
    });

    this._bikeService.updateMyBikes(this.myBikeList);
    this._bikeService.mybikesObservable.subscribe( ( mybikes ) => {
      this.myBikeList = mybikes;
    });

  }

}
