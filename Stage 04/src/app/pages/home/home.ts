
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { settings } from '../../settings/settings.class';
import { DataService } from '../../services/data-service';
import { IScheduleType, IBridgeType } from '../../types/schedule.type';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  schedule: Array<IScheduleType>;
  selectedBridge: {
    time_key: number,
    bridge_key: number,
    date: string,
    start: string,
    end: string,
    bridge: IBridgeType
  };

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

  clickCrew(time_key: number, bridge_key: number) {
    this.selectedBridge = this.dataService.getCrew(this.schedule, time_key, bridge_key);
    (settings.IsDebug) && console.log("home - clickCrew", this.selectedBridge);
  }

}
