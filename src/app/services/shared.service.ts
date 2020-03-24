import { Injectable } from '@angular/core';
import { flights } from './flights';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  flightList: any = [];
  searchedFlights: any = [];
  searchValue: any;
  airports: any = [
    {
      name: 'Pune',
      value: 'Pune'
    },
    {
      name: 'Mumbai',
      value: 'Mumbai'
    },
    {
      name: 'Delhi',
      value: 'Delhi'
    },
    {
      name: 'Chennai',
      value: 'Chennai'
    },
    {
      name: 'Banglore',
      value: 'Banglore'
    },
    {
      name: 'Hyderabad',
      value: 'Hyderabad'
    },
    {
      name: 'Ahemadabad',
      value: 'Ahemadabad'
    },
    {
      name: 'Nanded',
      value: 'Nanded'
    }
  ];
  constructor() {
    this.flightList = flights;
  }
}
