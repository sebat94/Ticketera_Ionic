import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
// COMPONENTS
import { BuildingLogoComponent } from './building-logo/building-logo';


@NgModule({
	declarations: [
		BuildingLogoComponent
	],
	imports: [
		IonicModule		// Necesitamos el 'IonicModule' para que reconozca las directivas de Ionic cuando creamos un componente
	],
	exports: [
		BuildingLogoComponent
	]
})
export class ComponentsModule {}
