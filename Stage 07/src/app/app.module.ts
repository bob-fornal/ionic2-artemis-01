
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, NavController } from 'ionic-angular';

import { ArtemisSchedulerApp } from './app.component';
import { HomePage } from './pages/home/home';
import { ChairsComponent } from './components/chairs';
import { AboutPage } from './pages/about/about';
import { EditPage } from './pages/edit/edit';

import { BehaviorService } from './services/behavior-service';

import { DataService } from './services/data-service';

@NgModule({
  declarations: [
    AboutPage,
    ArtemisSchedulerApp,
    ChairsComponent,
    EditPage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(ArtemisSchedulerApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AboutPage,
    ArtemisSchedulerApp,
    EditPage,
    HomePage
  ],
  providers: [
    BehaviorService,
    DataService
  ]
})
export class AppModule {}
