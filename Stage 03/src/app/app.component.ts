import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home';

import { settings } from './settings/settings.class';
import { DataService } from './services/data-service';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class ArtemisSchedulerApp {

  rootPage = HomePage;

  constructor(
    dataService: DataService,
    platform: Platform
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();

      dataService.getFeatureToggles().subscribe(
        (toggles) => {
          settings.IsDebug = toggles.IsDebug;
          settings.features = toggles.features;
          (settings.IsDebug) && console.log("app.component - getFeatureToggles", toggles);
        }
      );
    });
  }
}
