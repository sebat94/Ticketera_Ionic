import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// MODELS
import { IFiltersResponse } from '../../models/response';
// LIBRARIES
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
// CALENDAR CONFIGURATION
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
    one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@IonicPage()
@Component({
  selector: 'page-modal-events-filter',
  templateUrl: 'modal-events-filter.html',
})
export class ModalEventsFilterPage {

    knobValues: {lower: number,upper: number} = {
        lower: 0,
        upper: 100
    };
    hoveredDate: NgbDateStruct;
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
    sendFiltersJSON: IFiltersResponse;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public calendar: NgbCalendar) {
                    this.fromDate = calendar.getToday();
                    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    onDateSelection(date: NgbDateStruct) {
        if (!this.fromDate && !this.toDate)
            this.fromDate = date;
        else if (this.fromDate && !this.toDate && after(date, this.fromDate))
            this.toDate = date;
        else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
    isInside = date => after(date, this.fromDate) && before(date, this.toDate);
    isFrom = date => equals(date, this.fromDate);
    isTo = date => equals(date, this.toDate);

    filterByDateAndPrice() {
        this.sendFiltersJSON = {
            minPrice: this.knobValues.lower,
            maxPrice: this.knobValues.upper,
            dateMin: this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day,
            dateMax: this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day
        };
        this.viewCtrl.dismiss(this.sendFiltersJSON);
    }

    closeModalEventsFilter() {
        this.viewCtrl.dismiss();
    }

}
