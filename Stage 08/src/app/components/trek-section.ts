
import { Component, Input } from '@angular/core';

@Component({
  selector: 'trek-section',
  templateUrl: 'trek-section.html'
})
export class TrekSectionComponent {

  @Input('Color') color: string = "red";
  @Input('Empty') empty: boolean = false;

  constructor() {}

}
