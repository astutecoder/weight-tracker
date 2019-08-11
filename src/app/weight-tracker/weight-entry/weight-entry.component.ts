import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import Intro from 'src/app/intro/intro.model';
import { Weight } from '../weight.model';
import { IntroDataServices } from 'src/app/common/intro_data.services';
import { WeightTrackerServices } from './../weight_tracker.services';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'weight-entry',
    templateUrl: './weight-entry.component.html',
    styleUrls: ['./weight-entry.component.css']
})
export class WeightEntry implements OnInit {
    @ViewChild('weightEntryForm', null) weightEntryForm: NgForm;
    @Input('enable-edit-mode') enableEditMode: number;
    
    public intro = new Intro();
    
    public weightValue: number;
    public id: number;
    public date: Date;;
    public note: string;
    
    public isEditMode: boolean = false;
    public isDeletable = (this.weightTrackerServices.weightAll.length - 1) !== this.weightTrackerServices.selectedIndex;
    private hasDeleteRequest: boolean = false;

    constructor(private introDataService: IntroDataServices, private weightTrackerServices: WeightTrackerServices) {}

    ngOnInit() {
        if (this.intro.name === '') {
            this.intro = this.introDataService.getIntroData();
        }
    }

    ngOnChanges(){
        if(this.enableEditMode >= 0) {
            this.weightValue = this.weightTrackerServices.weight.weight;
            this.date = new Date(this.weightTrackerServices.weight.date);
            this.note = this.weightTrackerServices.weight.note;
            
            this.isEditMode = true;
            this.isDeletable = (this.weightTrackerServices.weightAll.length - 1) !== this.weightTrackerServices.selectedIndex
            
            this.weightTrackerServices.showWeightEntryForm = true;
        }
        if(this.enableEditMode === null) {
            this.resetForm();
        }
    }
    
    handleAddWeight()  {
        if (this.weightEntryForm.valid && !this.isEditMode){
            this.weightTrackerServices.addWeight(new Weight(Number(this.weightValue), this.date.getTime(), this.note));

            this.resetForm();
        }
        if(this.isEditMode) this.handleUpdateWeight();
    }

    private handleUpdateWeight() {        
        if(this.weightEntryForm.valid && this.isEditMode && !this.hasDeleteRequest){
            this.weightTrackerServices.updateWeight(new Weight(Number(this.weightValue), this.date.getTime(), this.note));            

            this.resetForm();
        }
        if(this.hasDeleteRequest) return this.deleteReq();
    }

    handleDeleteReq() {
        return this.hasDeleteRequest = true;
    }

    private deleteReq() {
        if(confirm('Are you sure to delete this?')) {
            this.weightTrackerServices.deleteWeight();            

            this.resetForm();
        }        
        this.hasDeleteRequest = false;
    }

    public resetForm () {
        this.isEditMode = false;
        
        this.weightTrackerServices.selectedIndex = null;
        this.weightTrackerServices.showWeightEntryForm = false;
        
        this.weightEntryForm.resetForm()
    }
}