import { Weight } from './../weight.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'weight-card',
  templateUrl: './weight-card.component.html',
  styleUrls: ['./weight-card.component.css']
})
export class WeightCardComponent implements OnInit {
  @Input('weight') weight: Weight;
  @Input('index') index: number;
  @Output('edit-weight') editWeight = new EventEmitter<{weight: Weight, index: number}>();

  constructor() { }

  ngOnInit() {
  }

  dateBeautify (date) {
    return moment(date).format('Do MMM, YYYY');
  }

  edit() {
    console.log({weight: this.weight, index: this.index});
    return this.editWeight.emit({weight: this.weight, index: this.index});
  }

}
