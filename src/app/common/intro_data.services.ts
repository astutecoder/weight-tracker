// import { EventEmitter } from '@angular/core';
import Intro from '../intro/intro.model';
import CryptoJS, { AES } from 'crypto-js';
import { SECRECT_PASS } from './constants';


export default class IntroDataServices {
    // public emitIntro = new EventEmitter<Intro>();
    public introData : Intro = new Intro();
    
    constructor() {
    }

    storeIntroData(payload: Intro) {
        this.setIntroData(payload);
        localStorage.setItem('introData', AES.encrypt(JSON.stringify(this.introData), SECRECT_PASS));
    }

    setIntroData(payload: Intro) {
        this.introData = payload;
    }

    getIntroData () {
        return JSON.parse(AES.decrypt(localStorage.getItem('introData'), SECRECT_PASS).toString(CryptoJS.enc.Utf8));
    }
    
}