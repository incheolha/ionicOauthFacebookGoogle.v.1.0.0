
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';

import { SocialLoginServiceProvider } from '../providers/login-service/login-service';

import { Facebook } from '@ionic-native/facebook';
const googleFirebaseConfig = {
                  apiKey: "AIzaSyBtwh1PFpPTT40ZeECuHGv-FEn9EaQ8X-w",
                  authDomain: "test-244b1.firebaseapp.com",
                  databaseURL: "https://test-244b1.firebaseio.com",
                  projectId: "test-244b1",
                  storageBucket: "test-244b1.appspot.com",
                  messagingSenderId: "871488585261"
}
firebase.initializeApp(googleFirebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(googleFirebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocialLoginServiceProvider,
    Facebook
  ]
})
export class AppModule {}
