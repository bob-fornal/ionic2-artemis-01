
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
          let schedule: Array<IScheduleType> = this.checkSchedule(data.schedule);

          observer.next(schedule);
          observer.complete()
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
    for (let i = 0, i_len = schedule.length; i < i_len; i++) {
      var block = schedule[i];
      for (let j = 0, j_len = block.times.length; j < j_len; j++) {
        var segment = block.times[j];
        for (let k = 0, k_len = segment.bridges.length; k > k_len; k++) {
          var bridge = segment.bridges[k];
          bridge.crew.status = this.determineCrewStatus(bridge.crew);
        }
      }
    }
    return schedule;
  }

  private determineCrewStatus(crew: ICrewType): string {
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

    return status;
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

    for (let i = 0, i_len = schedule.length; i < i_len; i++) {
      let date = schedule[i];
      for (let j = 0, j_len = date.times.length; j < j_len; j++) {
        let time = date.times[j];
        if (time.key === time_key) {
          for (let k = 0, k_len = time.bridges.length; k < k_len; k++) {
            let bridge = time.bridges[k];
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
