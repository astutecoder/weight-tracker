import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import Intro from 'src/app/intro/intro.model';
import { Weight } from '../weight.model';
import { IntroDataServices } from 'src/app/common/intro_data.services';
import { WeightTrackerServices } from './../weight_tracker.services';

@Component({
    selector: 'weight-entry',
    templateUrl: './weight-entry.component.html',
    styleUrls: ['./weight-entry.component.css']
})
export class WeightEntry implements OnInit {
    @ViewChild('weightEntryForm', null) weightEntryForm: NgForm;
    @Input('enable-edit-mode') enableEditMode: number;
    
    public weightValue: number;
    public id: number;
    public date: Date;
    public note: string;
    public isEditMode: boolean = false;
    private hasDeleteRequest: boolean = false;
    public showEntryForm: boolean = false;
    public isDeletable = (this.weightTrackerServices.weightAll.length - 1) !== this.weightTrackerServices.selectedIndex;
    public intro = new Intro();

    constructor(private introDataService: IntroDataServices, private weightTrackerServices: WeightTrackerServices) {}

    ngOnInit() {        
        if (this.intro.name === '') {
            this.intro = this.introDataService.getIntroData();
        }
    }

    ngOnChanges(){
        if(this.enableEditMode >= 0) {
            this.showEntryForm = true;
            this.weightValue = this.weightTrackerServices.weight.weight;
            this.date = new Date(this.weightTrackerServices.weight.date);
            this.note = this.weightTrackerServices.weight.note;
            this.isEditMode = true;
            this.isDeletable = (this.weightTrackerServices.weightAll.length - 1) !== this.weightTrackerServices.selectedIndex
        }
        if(this.enableEditMode === null) {
            this.showEntryForm = false;
            this.weightValue = undefined;
            this.date = undefined;
            this.note = null;
            this.isEditMode = false;
        }
    }
    
    handleAddWeight()  {
        if (this.weightEntryForm.valid && !this.isEditMode){
            this.weightTrackerServices.addWeight(new Weight(Number(this.weightValue), this.date.getTime(), this.note));

            this.showEntryForm = false;
            return this.resetForm()
        }
        if(this.isEditMode) this.handleUpdateWeight();
    }

    private handleUpdateWeight() {        
        if(this.weightEntryForm.valid && this.isEditMode && !this.hasDeleteRequest){
            this.weightTrackerServices.updateWeight(new Weight(Number(this.weightValue), this.date.getTime(), this.note));            

            this.showEntryForm = false;
            return this.resetForm();
        }
        if(this.hasDeleteRequest) return this.deleteReq();
    }

    handleDeleteReq() {
        return this.hasDeleteRequest = true;
    }

    private deleteReq() {
        if(confirm('Are you sure to delete this?')) {
            this.weightTrackerServices.deleteWeight();            

            this.showEntryForm = false;
            this.resetForm();
        }        
        this.hasDeleteRequest = false;
    }

    public resetForm () {      
        this.weightEntryForm.reset();
        this.weightTrackerServices.selectedIndex = null;
        this.showEntryForm = false;
    }
}