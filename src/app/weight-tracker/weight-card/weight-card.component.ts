import { Weight } from './../weight.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { WeightTrackerServices } from '../weight_tracker.services';

@Component({
  selector: 'weight-card',
  templateUrl: './weight-card.component.html',
  styleUrls: ['./weight-card.component.css']
})
export class WeightCardComponent implements OnInit {
  @Input('weight') weight: Weight;
  @Input('index') index: number;

  constructor(public weightTrackerServices: WeightTrackerServices) { }

  ngOnInit() {
  }

  dateBeautify (date) {
    return moment(date).format('Do MMM, YYYY');
  }

  edit() {
    const entryFormWrapper = document.querySelector('#weightEntryFormWrapper');
    entryFormWrapper.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    
    this.weightTrackerServices.selectedIndex = this.index
    this.weightTrackerServices.weight = this.weight;
    this.weightTrackerServices.showWeightEntryForm = true;
  }

}
