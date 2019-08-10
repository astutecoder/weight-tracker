import { EventEmitter } from '@angular/core';
import Intro from '../intro/intro.model';

export default class WeightTrackerServices {
    public emitIntro = new EventEmitter<Intro>();
    public introData : Intro = new Intro();
    constructor() {
    }

    setIntroData(payload: Intro) {
            this.introData = payload;
        }
    
}