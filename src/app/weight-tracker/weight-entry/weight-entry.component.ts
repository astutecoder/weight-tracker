import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import CryptoJS, { AES } from 'crypto-js';

import Intro from 'src/app/intro/intro.model';
import { Weight } from '../weight.model';
import { SECRECT_PASS } from 'src/app/shared/constants';

@Component({
    selector: 'weight-entry',
    templateUrl: './weight-entry.component.html',
    styleUrls: ['./weight-entry.component.css']
})
export default class WeightEntry implements OnInit {
    @ViewChild('weightEntryForm', null) weightEntryForm: NgForm;
    @Input('weightEdit') weightEdit: Weight;
    @Input('indexEdit') index: number;
    @Output('add-weight') addWeight = new EventEmitter<Weight>();
    @Output('update-weight') updateWeight = new EventEmitter<{weight: Weight, index: number}>();
    @Output('delete-weight') deleteWeight = new EventEmitter<{weight: Weight, index: number}>();
    
    public weightValue: number;
    public id: number;
    public date: Date;
    public note: string;
    private isEditMode: boolean = false;
    private hasDeleteRequest: boolean = false;
    public intro = new Intro();

    ngOnInit() {        
        if (this.intro.name === '') {
            this.intro = JSON.parse(AES.decrypt(localStorage.getItem('introData'), SECRECT_PASS).toString(CryptoJS.enc.Utf8))
        }
    }

    ngOnChanges(changes){
        if(this.weightEdit.weight) {
            this.id = this.index;
            this.weightValue = this.weightEdit.weight;
            this.date = new Date(this.weightEdit.date);
            this.note = this.weightEdit.note;
            this.isEditMode = true;
        }
        console.log('on change',this.weightEdit, changes)
    }
    
    handleAddWeight()  {
        console.log(this.weightEntryForm)
        if (this.weightEntryForm.valid && !this.isEditMode){
            this.addWeight.emit(new Weight(Number(this.weightValue), this.date.getTime(), this.note));
            
            return this.resetForm()
        }

        if(this.isEditMode) this.handleUpdateWeight();
    }

    private handleUpdateWeight() {        
        if(this.weightEntryForm.valid && this.isEditMode && !this.hasDeleteRequest){
            this.updateWeight.emit({weight: new Weight(Number(this.weightValue), this.date.getTime(), this.note), index: this.id});
            
            return this.resetForm();
        }
        if(this.hasDeleteRequest) return this.deleteReq();
    }

    handleDeleteReq() {
        return this.hasDeleteRequest = true;
    }

    private deleteReq() {
        if(confirm('Are you sure to delete this?')) {
            this.deleteWeight.emit({weight: new Weight(Number(this.weightValue), this.date.getTime(), this.note), index: this.id});
            
            this.resetForm();
        }        
        this.hasDeleteRequest = false;
    }

    private resetForm () {        
        this.isEditMode = false;
        this.hasDeleteRequest = false;
        this.weightEntryForm.reset();
        console.log('reset', this.weightEdit)
    }

    ngOnDestroy() {
        console.log('asdfsa destroy')
    }
}