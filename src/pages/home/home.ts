import { UserData } from './../../providers/login-service/userData.model';

import { LoginPage } from './../login/login';

import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialLoginServiceProvider } from './../../providers/login-service/login-service';
import { Subscription } from 'rxjs/Subscription';


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
  loginSubscription: Subscription;

  ngOnInit() {
                // this.facebookService.getUserProfile().then( profile => {
                //   console.log('user profile:', profile);
                //   this.userData = {
                //                     userId: profile['id'],
                //                     userName: profile['name'],
                //                     email: profile['email'],
                //                     picture: profile['picture_large']['data']['url']
                //                   }
                // })

    this.socialLoginService.checkLogintype.subscribe( (typeStatus: boolean) => {
          this.checkLoginType = typeStatus;
          console.log('이번 로그인 형태는 ', this.checkLoginType);
    })

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
