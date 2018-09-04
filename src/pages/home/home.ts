import { UserData } from './../../providers/login-service/userData.model';

import { LoginPage } from './../login/login';

import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialLoginServiceProvider } from './../../providers/login-service/login-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  currentUserData: UserData;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private socialLoginService: SocialLoginServiceProvider) { }

  checkLoginType: boolean;

  ngOnInit() {

    this.currentUserData = this.navParams.data.userData;
    console.log(this.currentUserData);
    console.log( this.currentUserData.loginType);
    console.log( this.currentUserData.uid);
    console.log( this.currentUserData.userName);
    console.log( this.currentUserData.userEmail);
    console.log( this.currentUserData.userPhotoUrl);
  }

  logOut() {

      if (this.currentUserData.loginType === '2') {
        this.socialLoginService.facebookLogout().then( () => {
          this.navCtrl.setRoot(LoginPage);
        })
      } else if (this.currentUserData.loginType === '3') {
        this.socialLoginService.googleLogOut().then( () => {
          this.navCtrl.setRoot(LoginPage);
        })
      }
  }
}
