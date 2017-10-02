import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public myForm: FormGroup;
  constructor(public storage: Storage, public toastCtrl: ToastController, public formBuilder: FormBuilder, public authService: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.myForm = formBuilder.group({
      fname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required])],
      chapter: ['', Validators.compose([Validators.required])],
      zone: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter() {
    this.authService.getToken().then(
      (suc) => {
        if(suc){
          this.navCtrl.setRoot(HomePage);
        }
        console.log(suc);
      }
    )
    //console.log('ionViewDidLoad LoginPage');
  }

  login(data: any){
    if(this.myForm.valid){
      this.authService.saveToken(this.myForm.value).then(
          (suc) => {
            this.navCtrl.setRoot(HomePage);
          },
          (err) => {
            this.toastCtrl.create({
              message: "A network error occurred!",
              duration: 3000,
              position: 'bottom'
            }).present();
          }
        );
    }else{
      this.toastCtrl.create({
        message: "All your details are required!",
        duration: 3000,
        position: 'bottom'
      }).present();
    }
  }
}
