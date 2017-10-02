import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  public contact: any;
  constructor(public event: Events, public authService: AuthProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.initialize(); 
    this.event.subscribe('contact:added', () => {
      this.initialize();
    }); 
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  getContact(): Promise<any>{
    return this.authService.getrecipient().then(
      (suc) => {
          return suc;
      }
    );
  }

  getLoginUser(){
    return this.authService.getToken().then(
      (suc) => {
        return suc;
      })
  }

  deleteContact(data){
      let alert = this.alertCtrl.create({
      title: 'Attention',
      message: 'You are about to delete a contact, are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            for(var i = 0; i < this.contact.length; i++) {
              if(this.contact[i] == data){
                  this.contact.splice(i, 1);
                }
              }
              
              this.authService.addrecipient(this.contact);              
              console.log(this.contact);
              // console.log(item);
          }
        }
      ]
    });
    alert.present();
  }

  uploadContact(data){
    let alert = this.alertCtrl.create({
      title: 'Attention',
      message: 'You are about to upload a contact, are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadCtrl.create({
              spinner: 'dots',
              content: 'Please wait'
            });
            loading.present();

            this.getLoginUser().then(
              res => {
                                  
                    this.authService.uploadRecipient(res,data).subscribe(
                      (res) => {
                        loading.dismiss();
                          if(res.status == 200){
                            for(var i = 0; i < this.contact.length; i++) {
                              if(this.contact[i] == data){
                                  this.contact[i].uploaded = 1;
                                }
                            }                              
                            this.authService.addrecipient(this.contact);

                            this.toastCtrl.create({
                              message: "Contact was successfully uploaded.",
                              duration: 3000,
                              position: 'bottom'
                            }).present();

                          }else{

                            this.toastCtrl.create({
                              message: "An error occurred, try again!",
                              duration: 3000,
                              position: 'bottom'
                            }).present();

                          }                      
                    },
                    (err) =>{
                      loading.dismiss();
                        this.toastCtrl.create({
                              message: "An error occurred, try again!",
                              duration: 3000,
                              position: 'bottom'
                        }).present();
                    }
                );                       
          }
        )
      }
    }
    ]
    });
    alert.present();
  }

  initialize(){
    this.getContact().then(
      res => {
        if(res){
            this.contact = res.slice().reverse();
        }
      }
    );
  }

}
