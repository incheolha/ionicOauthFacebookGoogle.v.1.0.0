
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

import firebase from 'firebase';
@Injectable()
export class SocialLoginServiceProvider {

  constructor(private facebook: Facebook,
               private gplus: GooglePlus) { }

  // 구글로 로그인하는 방식
  googleLogin() {
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
            return this.facebook.login(['email', 'public_profile']);
  }


  facebookGetLoginStatus() {
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
          return this.facebook.api('me?fields=id,name,email,picture.width(720).height(720).as(picture_large)', [])
  }

}
