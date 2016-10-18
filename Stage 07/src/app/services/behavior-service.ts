
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { IBehaviorType } from '../types/behavior.type';

@Injectable()
export class BehaviorService {

  _behaviorItemSource: any = new BehaviorSubject<IBehaviorType>({ type: "" });
  item: any = this._behaviorItemSource.asObservable();

  changeBehavior(selection: IBehaviorType) {
    this._behaviorItemSource.next(selection);
  }
}
