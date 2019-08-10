import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import Intro from './intro.model'
import IntroDataServices from '../common/intro_data.services';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.css']
})
export default class IntroComponent {
    @ViewChild('introForm', null) introForm: NgForm;
    @Output('intro-data-set') introDataSet = new EventEmitter<boolean>();
    private introData: Intro = new Intro();
    public incompleteForm = false;

    constructor(private introDataService: IntroDataServices){}

    onInputChange(e) {
        this.introData[e.target.name] = e.target.value;
    }
    
    handleSubmit() {
        if(this.introForm.valid){
            this.introDataService.storeIntroData(this.introData);
            this.introDataSet.emit(this.isIntroDataValid());
        }else {
            this.incompleteForm = true;
        }
    }

    private isIntroDataValid() {
        if(this.introData.name !== '')
            return true;
        
        return false;
    }
}
