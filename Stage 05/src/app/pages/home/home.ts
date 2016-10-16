
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EditPage } from '../edit/edit';

import { settings } from '../../settings/settings.class';
import { DataService } from '../../services/data-service';
import { IScheduleType, IBridgeType } from '../../types/schedule.type';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  entryComponents: [
    EditPage
  ]
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
      }
    );
  }

  ionViewWillEnter() {
    let changed = settings.changedCrew;
    if (settings.changedCrew !== null) {
      for (let date of this.schedule) {
        for (let time of date.times) {
          if (time.key === changed.time_key) {
            for (let bridge of time.bridges) {
              if (bridge.key === changed.bridge_key) {
                for (let key in changed.bridge.crew) {
                  bridge.crew[key] = changed.bridge.crew[key];
                }
                this.dataService.checkSchedule(this.schedule).subscribe(
                  (schedule: Array<IScheduleType>) => {
                    this.schedule = schedule;
                    settings.changedCrew = null;
                  }
                );
                break;
              }
            }
          }
        }
      }
    }
  }

  clickCrew(time_key: number, bridge_key: number) {
    let selectedBridge: {
      time_key: number,
      bridge_key: number,
      date: string,
      start: string,
      end: string,
      bridge: IBridgeType
    } = this.dataService.getCrew(this.schedule, time_key, bridge_key);
    (settings.IsDebug) && console.log("home - clickCrew", selectedBridge);
    this.navCtrl.push(EditPage, {
      SelectedBridge: selectedBridge
    });
  }

}
