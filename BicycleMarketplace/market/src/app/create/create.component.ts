import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Bike } from '../bike';
import { BicycleService } from '../services/bicycle.service';
import { AuthService } from '../services/auth.service';

import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url:'http://localhost:8000/api/bikes/upload'});

  bike: Bike = new Bike();
  bikeList: Array<Bike> = [];
  myBikeList: Array<Bike> = [];
  bikeImage: Boolean = false;
  savedFileName: string = "";
  id: string = "";

  constructor(private bikeService: BicycleService, private authService: AuthService) {
    this.bikeService.bikesObservable.subscribe( (bikes) => {
      this.bikeList = bikes;
    });

    this.bikeService.updateMyBikes(this.myBikeList);
    this.bikeService.mybikesObservable.subscribe( ( mybikes ) => {
      this.myBikeList = mybikes;
    });
   }

  ngOnInit() {
  }

  addListing(form: NgForm, uploader:object){
    console.log('AddListing called in createComponent!')
    if(uploader['queue'][0]['progress'] == 100 && this.bikeImage) {
    //check for bikeimage before creating new bike & save bike image after successful create of bike
      this.id = this.authService.currentUserId();
      // console.log(this.id);
      this.bikeService.createBike(this.id, this.bike).then((bike) => {
        this.bikeList.push(bike);
        this.bikeService.updateBikes(this.bikeList);
        this.bike = new Bike();
        form.reset();
        this.savedFileName = "";
        this.bikeImage = false;
        this.bikeService.getMyBikes(this.id).then(mybikes => {
          this.bikeService.updateMyBikes(mybikes);
        })
        .catch(error => {
          console.log(`Error retreiving myBikes in CreateComponent: ${ error }`)
        })
      })
      .catch(error => {
        console.log(`Create Bike Error in CreateComponent: ${ error }`);
      })
    }
    
  }
    
  upload(item: object){
    // console.log(item);
    this.savedFileName = "../assets/images/" + item['file']['name'];
    this.bikeImage = true;
    this.bike.image = this.savedFileName;
  }

  // public onAction(event: any){
  //   console.log('in onAction, the event:', event);
  //   // console.log('in onAction, this.getFileNames:', this.getFileNames(event.currentFiles));
  //   // this.bike.image = this.getFileNames(event.currentFiles);
  //   // console.log(event.currentFiles);
  //   // call service to post to server
  //   // save filename in Bike.image db 
  // }
  // public onAdded(event: any){
  //   console.log('in onAdded, event.id', event.id);
  //   this.bikeImage = true;
  // }
  // public onRemoved(event: any){
  //   console.log('in onRemoved, event.id', event.id);
  //   this.bikeImage = false;
  // }
  // private getFileNames(files:File[]):string{
  //   let names=files.map(file => file.name);
  //   return names ? names.join(", "): "No files currently added.";
  // }
}

