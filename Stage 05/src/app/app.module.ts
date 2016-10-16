
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { ArtemisSchedulerApp } from './app.component';
import { HomePage } from './pages/home/home';
import { EditPage } from './pages/edit/edit';

import { DataService } from './services/data-service';

@NgModule({
  declarations: [
    ArtemisSchedulerApp,
    HomePage,
    EditPage
  ],
  imports: [
    IonicModule.forRoot(ArtemisSchedulerApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ArtemisSchedulerApp,
    HomePage,
    EditPage
  ],
  providers: [
    DataService
  ]
})
export class AppModule {}
