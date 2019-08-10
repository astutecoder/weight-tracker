import { Component, OnInit } from '@angular/core';
import CryptoJS, { AES } from 'crypto-js';

import WeightTrackerServices from './shared/weight_tracker.services';
import Intro from './intro/intro.model';
import { SECRECT_PASS } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  hasIntroData = false;
  constructor(public weightTrackerService: WeightTrackerServices){
    if(localStorage.getItem('introData')){
      let introData = JSON.parse(AES.decrypt(localStorage.getItem('introData'), SECRECT_PASS).toString(CryptoJS.enc.Utf8));
      if(introData.name !== "") this.hasIntroData = true;
    }
    this.weightTrackerService.emitIntro.subscribe((data: Intro) => {
      if(data.name !== "") this.hasIntroData = true;
    });
  }
  
  ngOnInit(){
  }
}
