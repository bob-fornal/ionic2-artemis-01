
import { Component, Input } from '@angular/core';

import { IScheduleType, IBridgeType } from '../../types/schedule.type';

@Component({
  selector: 'artemis-chairs',
  templateUrl: 'chairs.html',
})
export class ChairsComponent {

  @Input('BridgeCrewStatus') status;

  constructor() {}

}
