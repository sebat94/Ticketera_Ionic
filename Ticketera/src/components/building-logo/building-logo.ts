import { Component, Input } from '@angular/core';

@Component({
  selector: 'building-logo',
  templateUrl: 'building-logo.html'
})
export class BuildingLogoComponent {

  @Input('img') img: string = '';

  constructor() { }

}
