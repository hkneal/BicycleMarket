import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { BicycleService } from '../../services/bicycle.service';
import { AuthService } from '../../services/auth.service';

import { Bike } from '../../bike';

import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit, OnDestroy {
  term: FormControl = new FormControl(); // form control of text input
  termSubscription; // subscription of term eventEmitter sequence
  filteredBikes = [];

  private bodyTextName: string;
  private bodyTextEmail: string;
  bike: Bike = new Bike();
  modalBike: Bike = new Bike();
  bikeList: Array<Bike> = [];
  currentId: string = "";
  owner: Bike = new Bike ();
  emptyList: boolean = true;
  deleteImage: string = "";

  constructor(private _bikeService: BicycleService, private _authService: AuthService, private _router:Router) {}

  ngOnInit() {
    this.currentId = this._authService.currentUserId();
    if(!this._authService.isAuthorized()){
      this._router.navigate(['']);
    }

    this._bikeService.bikesObservable.subscribe( (bikes) => {
      this.bikeList = bikes;
    });
    this.getBikes();
    
    this.filteredBikes = this.bikeList;
    
        this.termSubscription = this.term.valueChanges
          .debounceTime(200)
          .distinctUntilChanged()
          .subscribe(
              term => {
                let filterBy = term ? term.toLowerCase() : null;
                let filteredBikes = filterBy
                  ? this.bikeList.filter( item => item.title.toLowerCase().indexOf(filterBy) !== -1) : this.bikeList;
                this.filteredBikes = filteredBikes;
              }
          )
  }

  ngOnDestroy(){
    this.termSubscription.unsubscribe();
    // this._questionService.questionsObservable.unsubscribe();
  }

  getBikes() {
    this._bikeService.getBikes().then(bikes => {
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
        this._bikeService.updateBikes(this.bikeList);
    }).catch((error) => {
      console.log(`Error Deleting Bike in BrowseComponent: ${ error }`);
    });
  }

  openModal(bike: Bike){
    console.log('Model open clicked!');
    this.bodyTextName = bike['_user']['firstName'];
    this.bodyTextEmail = bike['_user']['email'];
  }
}