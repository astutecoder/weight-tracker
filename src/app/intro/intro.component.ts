import { WeightTrackerServices } from './../weight-tracker/weight_tracker.services';
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import Intro from './intro.model'
import { IntroDataServices } from '../common/intro_data.services';
import { Weight } from '../weight-tracker/weight.model';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.css']
})
export class IntroComponent {
    @ViewChild('introForm', null) introForm: NgForm;
    @Output('intro-data-set') introDataSet = new EventEmitter<boolean>();
    private introData: Intro = new Intro();
    public incompleteForm = false;

    constructor(private introDataService: IntroDataServices, private weightTrackerServices: WeightTrackerServices){}

    onInputChange(e) {
        this.introData[e.target.name] = e.target.value;
    }
    
    handleSubmit() {
        if(this.introForm.valid){
            this.introDataService.storeIntroData(this.introData);
            this.setInitialWeightData();
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

    private setInitialWeightData () {
        let weight = new Weight();
        weight.weight = this.introData.initial_weight;
        weight.date = new Date().getTime();
        weight.note = `You have set target to reach ${this.introData.target_weight} kg.`;
        weight.indicator = 'start';
        this.weightTrackerServices.addWeight(weight);
    }
}
