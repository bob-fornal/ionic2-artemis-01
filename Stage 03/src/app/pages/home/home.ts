
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { settings } from '../../settings/settings.class';
import { DataService } from '../../services/data-service';
import { IScheduleType } from '../../types/schedule.type';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  schedule: Array<IScheduleType>;

  constructor(
    public dataService: DataService,
    public navCtrl: NavController
  ) {
    dataService.getSchedule().subscribe(
      (schedule: Array<IScheduleType>) => {
        this.schedule = schedule;
        (settings.IsDebug) && console.log("home - getSchedule", schedule);
      }
    );
  }

}
