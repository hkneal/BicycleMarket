import { Component, OnInit } from '@angular/core';


import { BicycleService } from '../../services/bicycle.service';
import { AuthService } from '../../services/auth.service';

import { Bike } from '../../bike';


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  private bodyTextName: string;
  private bodyTextEmail: string;
  bike: Bike = new Bike();
  modalBike: Bike = new Bike();
  bikeList: Array<Bike> = [];
  currentId: string = "";
  owner: Bike = new Bike ();
  emptyList: boolean = true;

  constructor(private _bikeService: BicycleService, private _authService: AuthService) {}

  ngOnInit() {
    this._bikeService.bikesObservable.subscribe( (bikes) => {
      this.bikeList = bikes;
    });
    this.getBikes();
    this.currentId = this._authService.currentUserId();
  }

  getBikes() {
    this._bikeService.getBikes()
      .then(bikes => {
        this.bikeList = bikes;
        this._bikeService.updateBikes(this.bikeList);
        if(this.bikeList.length >0){
          this.emptyList = false;
        }
        // console.log(this.bikeList);
      })
      .catch(console.log);
    }

  delete(id: string):void {
    this._bikeService.removeBike(id).then(()=>{
      console.log('Bike Deleted');
      this.getBikes();
    }).catch(error => {
      console.log(`Error deleting Bike in BrowseComponent: ${ error }`);
    });
  }

  openModal(bike: Bike){
    console.log('Model open clicked!');
    this.bodyTextName = bike['_user']['firstName'];
    this.bodyTextEmail = bike['_user']['email'];
  }
}