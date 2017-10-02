import { Component } from '@angular/core';
import { NavController, ToastController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { ContactPage } from '../contact/contact';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public myForm: FormGroup;
  public recipient = [];
    constructor(public event: Events, public storage: Storage, public toastCtrl: ToastController, public formBuilder: FormBuilder, public authService: AuthProvider, public navCtrl: NavController) {
      //form input
      this.myForm = formBuilder.group({
      fname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      dept: [''],
      level: [''],
      finals: [''],
      uploaded: [0]
    });
    
    // this.event.subscribe('contact:added', () => {
    //   this.getRecipient();
    // });
  }

  ionViewWillEnter() {
    this.authService.getToken().then(
      (suc) => {
        if(!suc){
          this.navCtrl.setRoot(LoginPage);
        }else{
          //get recipient
          this.getRecipient();
        }
      }
    )
    //console.log('ionViewDidLoad LoginPage');
  }

  gotoContact(){
    this.navCtrl.push(ContactPage);
  }

  addContact(data: any){
    // console.log(this.recipient);
    if(this.myForm.valid){
      console.log(this.recipient);
      this.recipient.push(this.myForm.value);
      this.authService.addrecipient(this.recipient).then(
          (suc) => {            
            this.toastCtrl.create({
              message: "Contact was successfully added!",
              duration: 3000,
              position: 'bottom'
            }).present();
            this.myForm.reset();
          },
          (err) => {
            this.toastCtrl.create({
              message: "An error occurred, try again!",
              duration: 3000,
              position: 'bottom'
            }).present();
          }
        );
    }else{
      this.toastCtrl.create({
        message: "Required details are missing!",
        duration: 3000,
        position: 'bottom'
      }).present();
    }
  }

  getRecipient(){
    this.authService.getrecipient().then(
        (rec) => {
          if(rec){
            this.recipient = rec;
          }
        }
      );
  }

}
