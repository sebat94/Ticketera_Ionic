import { Component, Input } from '@angular/core';

@Component({
  selector: 'ticketera-gmap',
  templateUrl: './gmap.component.html'
})
export class GmapComponent {

  // GOOGLE MAPS
  @Input() lat: number;
  @Input() lng: number;
  zoom: number = 17;

  constructor() { }

}
