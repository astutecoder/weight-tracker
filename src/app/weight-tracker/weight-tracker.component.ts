import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

import { WeightTrackerServices } from './weight_tracker.services';
import { Weight } from './weight.model';

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

    constructor(public weightTrackerServices: WeightTrackerServices){}

    ngOnInit() {
        if(localStorage.getItem('WeightData')){
            this.weights = this.weightTrackerServices.getWeightAll();
        }
    }
}