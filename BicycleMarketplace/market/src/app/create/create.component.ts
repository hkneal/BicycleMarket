import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Bike } from '../bike';
import { BicycleService } from '../services/bicycle.service';
import { AuthService } from '../services/auth.service';
// import { Ng2FileInputService, Ng2FileInputModule, Ng2FileInputAction } from 'ng2-file-input';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';

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

  constructor(private bikeService: BicycleService, private _authService: AuthService, private _router: Router) {
    this.bikeService.updateBikes(this.bikeList);
    this.bikeService.bikesObservable.subscribe( (bikes) => {
      this.bikeList = bikes;
    });

    this.bikeService.updateMyBikes(this.myBikeList);
    this.bikeService.mybikesObservable.subscribe( ( mybikes ) => {
      this.myBikeList = mybikes;
    });
   }

  ngOnInit() {
    if(!this._authService.isAuthorized()){
      this._router.navigate(['']);
    }
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
         console.log("ImageUpload:uploaded:", item, status, response);
         this.getUrl(item);
     };
  }

  addListing(form: NgForm, uploader:object){
    console.log('AddListing called in createComponent!')
    if(uploader['queue'][0]['progress'] == 100 && this.bikeImage) {
      // console.log('In if block!');
    //check for bikeimage before creating new bike & save bike image after successful create of bike
        this.id = this._authService.currentUserId();
        // console.log(this.id);
        // console.log(this.bike);
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
    
  getUrl(item: object){
    // First verifies images is uploaded then gets the URL of the uploaded image
    if(item['isUploaded']){
      this.bikeService.getUrl(item['file']['name']).then((url) => {
        this.savedFileName = url;
        // console.log("this.savedFileName:", this.savedFileName);

        //Flip the got bike image flags sets the bike.image name before creating bike object into db
        this.bikeImage = true;
        // this.bike.image = this.savedFileName;
        const nameArray = this.savedFileName.split("?", 1)
        this.bike.image = nameArray[0];
        // console.log("this.bike.image", this.bike.image);
      }).catch(error => {
        console.log(`GetUrl Error in CreateComponent: ${ error }`);
      });
    } else console.log('Not loaded yet')
  }

}

