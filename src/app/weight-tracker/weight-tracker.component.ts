import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import CryptoJS, { AES } from 'crypto-js';

import WeightTrackerServices from '../shared/weight_tracker.services';
import { Weight } from './weight.model';
import { SECRECT_PASS } from './../shared/constants';

@Component({
    selector: 'app-weight-tracker',
    templateUrl: './weight-tracker.component.html',
    styleUrls: ['./weight-tracker.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export default class WeigthTrackerComponent implements OnInit {
    public weights: Weight[] = [];
    public weight = new Weight();
    public index: number;

    constructor(public weightTrackerService: WeightTrackerServices){}

    ngOnInit() {
        if(localStorage.getItem('WeightData')){
            this.weights = JSON.parse(AES.decrypt(localStorage.getItem('WeightData'), SECRECT_PASS).toString(CryptoJS.enc.Utf8))
        }
    }

    addWeight(val: Weight) {
        if(this.weights[0]){
            val["indicator"] = this.weights[0].weight > val.weight ? 'down' : 'up';
        }
        this.weights.splice(0, 0, val);
        localStorage.setItem('WeightData', AES.encrypt(JSON.stringify(this.weights), SECRECT_PASS));
    }
    
    editWeight(val: {weight:Weight, index: number}) {
        this.weight = val.weight;
        this.index = val.index
        console.log('val',val)
    }
    
    private updateWeight(val: {weight: Weight, index: number}) {
        if(this.weights[val.index + 1]){
            val.weight["indicator"] = this.weights[val.index + 1].weight > val.weight.weight ? 'down' : 'up';
        }
         this.weights.splice(val.index, 1, val.weight);
        
         return localStorage.setItem('WeightData', AES.encrypt(JSON.stringify(this.weights), SECRECT_PASS));
    }
    
    private deleteWeight(val: {weight: Weight, index: number}) {
        this.weights.splice(val.index, 1);
        return localStorage.setItem('WeightData', AES.encrypt(JSON.stringify(this.weights), SECRECT_PASS));
    }

}