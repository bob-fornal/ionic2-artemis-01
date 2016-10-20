
import { Component, Input } from '@angular/core';

@Component({
  selector: 'trek-header',
  templateUrl: 'trek-header.html'
})
export class TrekHeaderComponent {

  @Input('Color') color;

  constructor() {}

}
