import { Injectable, Output, EventEmitter } from '@angular/core';
import CryptoJS, { AES } from 'crypto-js';

import { Weight } from './weight.model';
import { SECRECT_PASS } from '../common/constants';

@Injectable({ providedIn: 'root' })
export class WeightTrackerServices {
    public weight: Weight;
    public weightAll: Weight[] = [];
    public selectedIndex: number;
    public enableWeightEdit: boolean = false;

    getWeightAll() {
        this.weightAll = JSON.parse(AES.decrypt(localStorage.getItem('WeightData'), SECRECT_PASS).toString(CryptoJS.enc.Utf8));        
        return this.weightAll;
    }

    private storeWeightAll() {
        localStorage.setItem('WeightData', AES.encrypt(JSON.stringify(this.weightAll), SECRECT_PASS));
    }

    private addOrUpdate(start: number, deleteCount: number, checkIndex:number, payload: Weight) {
        payload["indicator"] = this.setIndicator(checkIndex, payload); 
        this.weightAll.splice(start, deleteCount, payload);
        return;
    }

    addWeight(payload: Weight){
        this.weight = payload;
        this.addOrUpdate(0, 0, 0, payload)
        this.storeWeightAll();
    }

    updateWeight(payload: Weight){
        let currentIndex = this.selectedIndex;
        let previousIndex = currentIndex - 1;
        let nextIndex = currentIndex + 1;

        this.weight = payload;
        
        this.addOrUpdate(currentIndex, 1, nextIndex, payload);
        
        if(this.weightAll[previousIndex])
            this.addOrUpdate(previousIndex, 1, currentIndex, this.weightAll[previousIndex]);

        this.storeWeightAll();
    }

    deleteWeight(){
        this.weightAll.splice(this.selectedIndex, 1);
        this.storeWeightAll();
    }

    private setIndicator(index, payload: Weight) {
        if(this.weightAll[index]){
            return (this.weightAll[index].weight > payload.weight 
                ? 'down' 
                : (this.weightAll[index].weight === payload.weight 
                    ? 'stable' 
                    : 'up')
            );
        }
        return 'start'
    }
}