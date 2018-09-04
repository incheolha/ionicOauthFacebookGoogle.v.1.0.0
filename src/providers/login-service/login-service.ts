
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { UserData } from './userData.model';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
@Injectable()
export class SocialLoginServiceProvider {

  checkLogintype = new Subject<boolean>();
  checkUserData = new Subject<UserData>();

  loginType: boolean;

  constructor(private facebook: Facebook,
               private gplus: GooglePlus) {

  }


  setLoginType(loginType: boolean) {
    this.loginType = loginType;
    console.log(this.loginType);
    return this.loginType;
  }

  getLoginType() {
    return this.loginType;
  }
  // 구글로 로그인하는 방식
  googleLogin() {
    this.checkLogintype.next(false);
    return this.gplus.login({
                              'webClientId': '871488585261-1uuhe7hfiquh0e9728br2leh6pt2fcea.apps.googleusercontent.com',
                              'offline': true
                            });
  }

  googleLogOut() {
            firebase.auth().signOut();
            return this.gplus.logout();
  }


  // facebook 로그인 방식

  facebookLogin() {

            console.log(this.checkLogintype);
            return this.facebook.login(['email', 'public_profile']);
  }


  facebookGetLoginStatus() {

            console.log(this.checkLogintype);
            return this.facebook.getLoginStatus();
  }

  facebookLogout() {

            return this.facebook.logout();
  }

  facebookShareStatus() {
                    let options = {
                      method: 'share',
                      href: 'http://www.techsavvym.com',
                      caption: 'My Company is',
                      description: 'my company',
                      hashTag: '#tsm'
                    }
              return this.facebook.showDialog(options);
  }

  facebookGetUserProfile() {
          return this.facebook.api('me?fields=id,name,email, picture.width(720).height(720).as(picture_large)', [])
  }
}
