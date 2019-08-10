import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { WeightTrackerServices } from './weight_tracker.services';
import { Weight } from './weight.model';

@Component({
    selector: 'app-weight-tracker',
    templateUrl: './weight-tracker.component.html',
    styleUrls: ['./weight-tracker.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class WeigthTrackerComponent implements OnInit {
    public weights: Weight[] = this.weightTrackerServices.weightAll;

    constructor(public weightTrackerServices: WeightTrackerServices){}

    ngOnInit() {
        if(localStorage.getItem('WeightData')){
            this.weights = this.weightTrackerServices.getWeightAll();
        }
    }
}