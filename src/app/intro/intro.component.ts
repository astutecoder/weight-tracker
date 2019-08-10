import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AES } from 'crypto-js';

import Intro from './intro.model'
import WeightTrackerServices from '../shared/weight_tracker.services';
import { SECRECT_PASS } from '../shared/constants';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.css']
})
export default class IntroComponent {
    @ViewChild('introForm', null) introForm: NgForm;
    private introData: Intro = new Intro();
    public incompleteForm = false;

    constructor(private weightTrackerService: WeightTrackerServices){}

    onInputChange(e) {
        this.introData[e.target.name] = e.target.value;
    }

    isNumber(givenNumber: number) {
        return givenNumber === undefined ? false : !!(givenNumber.toString().match(/^\d+\.?(\d+)?$/));
    }
    
    handleSubmit() {
            if(this.introForm.valid){
                this.weightTrackerService.setIntroData(this.introData);            
                this.weightTrackerService.emitIntro.emit(this.introData);
                localStorage.setItem('introData', AES.encrypt(JSON.stringify(this.weightTrackerService.introData), SECRECT_PASS));
            }else {
                this.incompleteForm = true;
            }
    }
}
