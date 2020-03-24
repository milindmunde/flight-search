import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.less']
})
export class FlightsComponent implements OnInit {

  flightList: any = [];
  constructor(
    private sharedSvc: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.sharedSvc.searchedFlights.length === 0) {
      this.router.navigate(['/home']);
    } else {
      this.flightList = this.sharedSvc.searchedFlights;
    }
  }
  moveBack() {
    this.sharedSvc.searchValue = null;
    this.router.navigate(['/home']);
  }

  updateSearch() {
    this.router.navigate(['/home']);
  }
}
