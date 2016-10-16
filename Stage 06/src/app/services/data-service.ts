
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { settings } from '../settings/settings.class';
import { IScheduleType, IBridgeType, ICrewType } from '../types/schedule.type';

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
        (error) => {
          (settings.IsDebug) && console.log(error);
        },
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
        (data: any) => {
          this.checkSchedule(data.schedule).subscribe(
            (schedule: Array<IScheduleType>) => {
              observer.next(schedule);
              observer.complete()
            }
          );
        },
        (error) => {
          (settings.IsDebug) && console.log(error);
        },
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

  checkSchedule(schedule: Array<IScheduleType>) {
    console.log("data-service schedule", schedule);
    return Observable.create((observer) => {
      for (let block of schedule) {
        for (let segment of block.times) {
          for (let bridge of segment.bridges) {
            this.determineCrewStatus(bridge.crew).subscribe(
              (status) => {
                bridge.crew.status = status;
              }
            );
          }
        }
      }
      observer.next(schedule);
      observer.complete();
    });
  }

  private determineCrewStatus(crew: ICrewType) {
    return Observable.create((observer) => {
      let status = "free";
      let processed = [];

      if (typeof crew.captain !== "undefined" && crew.captain.length > 0) {
        processed.push("Cpt");
      }
      if (typeof crew.tactical !== "undefined" && crew.tactical.length > 0) {
        processed.push("Tac");
      }
      if (typeof crew.engineering !== "undefined" && crew.engineering.length > 0) {
        processed.push("Eng");
      }
      if (typeof crew.helm !== "undefined" && crew.helm.length > 0) {
        processed.push("Helm");
      }
      if (typeof crew.science !== "undefined" && crew.science.length > 0) {
        processed.push("Sci");
      }
      if (typeof crew.communications !== "undefined" && crew.communications.length > 0) {
        processed.push("Comm");
      }

      if (processed.length > 0) {
        status = processed.join(", ");
      }

      observer.next(status);
      observer.complete();
    });
  }

  getCrew(schedule: Array<IScheduleType>, time_key: number, bridge_key: number): {
    time_key: number,
    bridge_key: number,
    date: string,
    start: string,
    end: string,
    bridge: IBridgeType
  } {
    let result: {
      time_key: number,
      bridge_key: number,
      date: string,
      start: string,
      end: string,
      bridge: IBridgeType
    };

    for (let date of schedule) {
      for (let time of date.times) {
        if (time.key === time_key) {
          for (let bridge of time.bridges) {
            if (bridge.key === bridge_key) {
              result = {
                time_key: time_key,
                bridge_key: bridge_key,
                date: date.date,
                start: time.start,
                end: time.end,
                bridge: bridge
              };
              break;
            }
          }
        }
      }
    }
    return result;
  }

}
