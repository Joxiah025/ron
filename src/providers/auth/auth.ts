import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public event: Events, public storage: Storage, public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

  getToken(): Promise<any> {    
    return this.storage.get('user').then(
      token => {
        return token;
      }
    );
  }

  removeToken(): Promise<any>{
    return this.storage.remove('user');
  }

  saveToken(data): Promise<any>{
    //let newData = JSON.stringify(data);
    return this.storage.set('user', data);
  }

  //add recipient
  addrecipient(data): Promise<any>{
    return this.storage.set('contact', data).then(
      res => {
        this.event.publish('contact:added');
      }
    )
  }

  //get recipient
  getrecipient(): Promise<any>{
    return this.storage.get('contact').then(
      token => {
        return token;
      }
    );
  }

  //add recipient
  removerecipient(): Promise<any>{
    return this.storage.remove('contact')
  }

  //upload recipient
  uploadRecipient(user,recipient){
    var data = [user,recipient];
    var url = 'http://ronfeedback.blwcampusministry.com/api/pages/upload.php';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,JSON.stringify(data),options)
    .map(res => {return res.json()})

  }

}
