import { Component , ViewEncapsulation, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightSearchComponent implements OnInit{
  searchForm: FormGroup;
  activeViewIndex: any = 0;
  travelersList: any = ['1 Adult', '2 Adult', '3 Adult', '4 Adult', '5 Adult'];
  btnTitle: string= 'Search Flights';
  srcAirport: string= null;
  destAirport: string = null;
  travelersClassList:any = ['Economy', 'Business'];
  noFlightFound:boolean = false;

  constructor(
    private fb: FormBuilder,
    private sharedSvc: SharedService,
    private router: Router
  ) {

  }

  ngOnInit() {
    if (this.sharedSvc.searchValue) {
      this.searchForm = this.fb.group({
        departDate: new FormControl(this.sharedSvc.searchValue.departDate, Validators.required),
        returnDate: new FormControl(this.sharedSvc.searchValue.returnDate),
        travelers: new FormControl(this.sharedSvc.searchValue.travelers, Validators.required),
        travelersClass: new FormControl(this.sharedSvc.searchValue.travelersClass)
      });
    } else {
      this.searchForm = this.fb.group({
        departDate: ['', Validators.required ],
        returnDate: [''],
        travelers: ['', Validators.required ],
        travelersClass: ['']
      });
    }
  }

  onSubmit(value) {
    var response = this.sharedSvc.flightList.filter((flight) =>
    (flight.src === this.srcAirport) &&
    (flight.dest === this.destAirport) &&
    (value.departDate === flight.date));
    if (response.length === 0) {
      this.noFlightFound = true;
    } else {
      this.noFlightFound = false;
      response[0].count = value.travelers;
      var returnList = [];

      if (value.returnDate) {
        returnList = this.sharedSvc.flightList.filter((flight) =>
        (flight.dest === this.srcAirport) &&
        (flight.src === this.destAirport) &&
        (value.returnDate === flight.date));
      }
      this.sharedSvc.searchedFlights = [...response, ...returnList];
      this.sharedSvc.searchValue = value;
      this.router.navigate(['/flights']);
    }
  }
  srcSelected(value) {
    this.srcAirport = value;
  }

  destSelected(value) {
    this.destAirport = value;
  }
}
