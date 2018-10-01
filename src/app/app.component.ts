import { Component } from '@angular/core';
import * as firebase from "firebase";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(){
    const config = {
      apiKey: "AIzaSyC3CgF--V0HVuoSv9c3pOK4kGlpY2VdUhk",
      authDomain: "certificationangularocr.firebaseapp.com",
      databaseURL: "https://certificationangularocr.firebaseio.com",
      projectId: "certificationangularocr",
      storageBucket: "certificationangularocr.appspot.com",
      messagingSenderId: "791546424326"
    };
    firebase.initializeApp(config);
  }
}
