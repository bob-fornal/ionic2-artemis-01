
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';


@Injectable()
export class DataService {

  constructor(
    private _http: Http
  ) {}

  private errorHandler(error) {
    return Observable.throw(error.err.message || 'Server Error');
  }

  getFeatureToggles() {
    return Observable.create((observer) => {
      this.readFeatureToggles().subscribe(
        (toggles) => {
          observer.next(toggles);
          observer.complete()
        },
        (error) => {},
        () => {}
      );
    });
  }

  private readFeatureToggles() {
    let URL: string = "./feature.toggles.json";
    return this._http.get(URL)
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  getSchedule() {
    return Observable.create((observer) => {
      this.readSchedule().subscribe(
        (schedule) => {
          observer.next(schedule);
          observer.complete()
        },
        (error) => {},
        () => {}
      );
    });
  }

  private readSchedule() {
    let URL: string = "./schedule.json";
    return this._http.get(URL)
      .map(res => res.json())
      .catch(this.errorHandler);
  }

}
