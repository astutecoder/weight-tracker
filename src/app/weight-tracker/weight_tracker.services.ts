import { Injectable, Output, EventEmitter } from '@angular/core';
import CryptoJS, { AES } from 'crypto-js';

import { Weight } from './weight.model';
import { SECRECT_PASS } from '../common/constants';

@Injectable({ providedIn: 'root' })
export class WeightTrackerServices {
    public weight: Weight;
    public weightAll: Weight[];
    public selectedIndex: number;
    public enableWeightEdit: boolean = false;

    getWeightAll() {
        this.weightAll = JSON.parse(AES.decrypt(localStorage.getItem('WeightData'), SECRECT_PASS).toString(CryptoJS.enc.Utf8));        
        return this.weightAll;
    }

    private storeWeightAll() {
        localStorage.setItem('WeightData', AES.encrypt(JSON.stringify(this.weightAll), SECRECT_PASS));
    }

    addWeight(payload: Weight){
        this.weight = payload
        this.weight["indicator"] = this.setIndicator()
        this.weightAll.splice(0, 0, this.weight)
        this.storeWeightAll();
    }

    updateWeight(payload: Weight){
        payload['indicator'] = this.setIndicator(this.selectedIndex + 1);
        this.weightAll[this.selectedIndex] = payload;
        this.storeWeightAll();
    }

    deleteWeight(){
        this.weightAll.splice(this.selectedIndex, 1);
        this.storeWeightAll();
    }

    private setIndicator(index = 0) {
        if(this.weightAll[index]){
            return this.weightAll[index].weight > this.weight.weight ? 'down' : 'up';
        }
    }
}