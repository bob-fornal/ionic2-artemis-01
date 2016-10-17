
import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { settings } from '../../settings/settings.class';
import { DataService } from '../../services/data-service';
import { IScheduleType, IBridgeType } from '../../types/schedule.type';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage {

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
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.selectedBridge = navParams.get('SelectedBridge');
  }

  applyCrew() {
    for (let key in this.selectedBridge.bridge.crew) {
      if (this.selectedBridge.bridge.crew[key].length === 0) {
        delete this.selectedBridge.bridge.crew[key];
      }
    }
    settings.changedCrew = this.selectedBridge;
    (settings.IsDebug) && console.log("edit applyCrew", this.selectedBridge);
    this.navCtrl.pop();
  }

}
