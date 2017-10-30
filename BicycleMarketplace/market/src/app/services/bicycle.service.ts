import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';

import { Bike } from '../bike';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class BicycleService {
  bikesObservable = new BehaviorSubject(null);
  mybikesObservable = new BehaviorSubject(null);

  constructor(private http: Http) { }

  updateBikes(bikes: Array<Bike>){
    this.bikesObservable.next(bikes);
  }

  updateMyBikes(bikes: Array<Bike>){
    this.mybikesObservable.next(bikes);
  }

  getBikes(): Promise<Bike[]> {
    return this.http.get('/api/bikes')
    .map(response => response.json())
    .toPromise();
  }
  getMyBikes(id: String): Promise<Bike[]> {
    return this.http.get(`/api/bikes/my/${ id }`)
    .map(response => response.json())
    .toPromise();
  }

  getBike(id: String): Promise<Bike> {
    return this.http.get(`/api/bikes/${ id }`)
    .map(response => response.json())
    .toPromise();
  }

  createBike(id: String, bike: Bike): Promise<Bike> {
    return this.http.post(`/api/bikes/addBike/${ id }`, bike)
    .map(response => response.json())
    .toPromise();
  }

  getUrl(name: String): Promise<string> {
    return this.http.get(`/api/bikes/getUrl/${ name }`)
    .map(response => response.json())
    .toPromise();
  }

  updateBike(bike: Bike): Promise<Bike> {
    console.log(bike._id);
    return this.http.put(`/api/bikes/${ bike._id }`, bike)
    .map(response => response.json())
    .toPromise();
  }

  removeBike(id: String): Promise<Bike> {
    return this.http.delete(`/api/bikes/${ id }`)
    .map(response => response.json())
    .toPromise();
  }

  upload(image: ImageBitmap) {
    return this.http.post('api/bikes/upload', image)
    .map(response => response.json())
    .toPromise();
  }

}
