import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Bike } from '../bike';
import { BicycleService } from '../services/bicycle.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  bike : Bike = new Bike();
  myBikeList: Array<Bike> = [];
  currentId: string = "";

  constructor(private _bikeService: BicycleService, private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    if(!this._authService.isAuthorized()){
      this._router.navigate(['']);
    }

    this.currentId = this._authService.currentUserId();
    this._bikeService.mybikesObservable.subscribe( ( mybikes ) => {
      this.myBikeList = mybikes;
    });
    this.getMyBikeListing();
  }

  getMyBikeListing():void {
    this._bikeService.getMyBikes(this.currentId).then(bikes => {
      this.myBikeList = bikes;
    })
    .catch(error => {
      console.log(`Error retreiving bikes in editComponent: ${ error }`);
    })
  }

  delete(id: string):void {
    this._bikeService.removeBike(id).then(() => {
      console.log('Bike Deleted');
      this.getMyBikeListing();
    }).catch(error => {
      console.log(`Error deleting Bike in BrowseComponent: ${ error }`);
    });
  }

  updateListing(bike: Bike): void {
    console.log(bike);
    // console.log(this.bike)
    this._bikeService.updateBike(bike).then(() => {
      console.log('Bike Updated');
      this.getMyBikeListing();
    }).catch(error => {
    console.log(`Error updating Bike in BrowseComponent: ${ error }`);
  });
  }

}
