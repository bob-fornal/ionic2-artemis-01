
import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { BehaviorService } from '../../services/behavior-service';
import { Subscription } from 'rxjs/subscription';
import { IBehaviorType } from '../../types/behavior.type';

import { AboutPage } from '../about/about';
import { EditPage } from '../edit/edit';

import { ChairsComponent } from '../../components/chairs';

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

  subscription: Subscription;

  schedule: Array<IScheduleType>;
  open: any = {};
  aboutOpen: boolean = false;

  constructor(
    private behavior: BehaviorService,
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

  ngOnInit() {
    this.subscription = this.behavior.item.subscribe(
      (item: IBehaviorType) => {
        switch (item.type) {
          case ("change crew"):
            (settings.IsDebug) && console.log("home - change crew", item.data);
            this._processCrewChange(item.data)
            break;
        }
      }
    );
  }

  _processCrewChange(changed) {
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
                }
              );
              break;
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

  clearCrew(item, time, bridge) {
    let time_key: number = time.key;
    let bridge_key: number = bridge.key;
    this.dataService.deleteCrew(this.schedule, time_key, bridge_key).subscribe(
      (schedule) => {
        this.schedule = schedule;
        console.log("clearCrew", schedule);
      }
    );
  }

  popHome() {
    this.menuCtrl.close();
  }
  pushAbout() {
    this.navCtrl.push(AboutPage, {});
    this.menuCtrl.close();
  }

}
