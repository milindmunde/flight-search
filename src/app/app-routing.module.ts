import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsComponent } from './flights/flights.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';


const routes: Routes = [
  { path: '', component: FlightSearchComponent },
  { path: 'home', component: FlightSearchComponent },
   { path: 'flights', component: FlightsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
