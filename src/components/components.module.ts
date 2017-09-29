import { NgModule } from '@angular/core';
import { CountComponent } from './counter/counter';
import { FlightTabComponent } from './flighttab/flighttab';

@NgModule({
	declarations: [CountComponent,FlightTabComponent],
	imports: [],
	exports: [CountComponent,FlightTabComponent]
})
export class ComponentsModule {}
