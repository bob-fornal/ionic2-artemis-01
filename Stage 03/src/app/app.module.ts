
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { ArtemisSchedulerApp } from './app.component';
import { HomePage } from './pages/home/home';

import { DataService } from './services/data-service';

@NgModule({
  declarations: [
    ArtemisSchedulerApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(ArtemisSchedulerApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ArtemisSchedulerApp,
    HomePage
  ],
  providers: [
    DataService
  ]
})
export class AppModule {}
