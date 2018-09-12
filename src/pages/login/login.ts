
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';
import { SocialLoginServiceProvider } from './../../providers/login-service/login-service';

import { HomePage } from '../home/home';
import { UserData } from '../../providers/login-service/userData.model';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userData: UserData;
  nodeServerLogin = "node";
  facebookLogin = "facebook";
  googleLogin = "google";

  constructor(public navCtrl: NavController,
              private socialLoginService: SocialLoginServiceProvider ) {}

  loginWithGoogle() {
    this.socialLoginService.googleLogin().then( res => {
                                firebase.auth().signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
                                        .then( suc => {
                                          console.log( suc.user.displayName );
                                          console.log( suc.user.email );
                                          console.log( suc.user.photoURL );
                                          console.log( suc.user.uid );

                                          this.userData = new UserData( suc.user.uid, suc.user.displayName, suc.user.email, suc.user.photoURL, this.googleLogin);
                                          alert('login succ');
                                          this.navCtrl.setRoot(HomePage, {userData: this.userData});
                                        }).catch(ns => alert("not successful"))
                      })
  }

  loginwithFacebook() {

  this.socialLoginService.facebookGetLoginStatus().then( res => {
      if (res.status === 'connected') {
                console.log('this facebook has been already logged on');
                this.socialLoginService.facebookGetUserProfile().then( profile => {
                  console.log(profile['id']);
                  console.log(profile['name']);
                  console.log(profile['email']);
                  console.log(profile['picture_large']['data']['url']);
                  this.userData = new UserData(profile['id'], profile['name'], profile['email'], profile['picture_large']['data']['url'], this.facebookLogin);

                  this.navCtrl.setRoot(HomePage, {userData:this.userData});

                }).catch( e => console.log( e ));
        } else {
                console.log( 'this facebook has not been logged yet');
                this.socialLoginService.facebookLogin().then ( data => {
                            this.socialLoginService.facebookGetUserProfile().then( profile => {
                              console.log(profile['id']);
                              console.log(profile['name']);
                              console.log(profile['email']);
                              console.log(profile['picture_large']['data']['url']);
                              this.userData = new UserData(profile['id'], profile['name'], profile['email'], profile['picture_large']['data']['url'], this.facebookLogin);
                              this.navCtrl.setRoot(HomePage, {userData:this.userData});
                            }).catch( e => console.log( e ));
                }).catch( err => console.log( err ));
              }
    }).catch( error => console.log(error));

  }

}
