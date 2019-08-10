import { Component, OnInit } from '@angular/core';

import IntroDataServices from './common/intro_data.services';
import Intro from './intro/intro.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private hasIntroData = false;
  
  constructor(public introDataService: IntroDataServices){}
  
  ngOnInit(){
    if(localStorage.getItem('introData')){
      let introData = this.introDataService.getIntroData();
      if(introData.name !== "") this.hasIntroData = true;
    }
  }

  handleIntroDataCheck(val) {
    if(val) this.hasIntroData = true;
  }
}
