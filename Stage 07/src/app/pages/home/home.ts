
import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { EditPage } from '../edit/edit';

import { settings } from '../../settings/settings.class';
import { DataService } from '../../services/data-service';
import { IScheduleType, IBridgeType } from '../../types/schedule.type';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  entryComponents: [
    AboutPage,
    EditPage
  ]
})
export class HomePage {

  schedule: Array<IScheduleType>;
  open: any = {};
  aboutOpen: boolean = false;

  constructor(
    public dataService: DataService,
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {
    dataService.getSchedule().subscribe(
      (schedule: Array<IScheduleType>) => {
        this.schedule = schedule;
        for (let idx in schedule) {
          this.open['position_' + idx] = true;
        }
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

  toggleHeader(idx) {
    this.open['position_' + idx] = !this.open['position_' + idx];
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

  clearCrew(item, block, time, bridge) {
    (settings.IsDebug) && console.log("home - clearCrew", item, block, time, bridge);
  }

  popHome() {
    this.menuCtrl.close();
  }
  pushAbout() {
    this.navCtrl.push(AboutPage, {});
    this.menuCtrl.close();
  }

}
