import { Component, OnInit, Input,  Output, EventEmitter  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service'
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.less']
})
export class SearchBoxComponent implements OnInit {
  selectedAirport = new FormControl();
  filteredAirports: Observable<[]>;
  airports: any;
  @Input() public label: string;
  @Output() private valueSelected = new EventEmitter<string>();

  constructor(private sharedSvc: SharedService) {
    this.airports = this.sharedSvc.airports;
    this.filteredAirports = this.selectedAirport.valueChanges
    .pipe(
      startWith(''),
      map(airport => airport ? this._filterStates(airport) : this.airports.slice())
    );
  }
  ngOnInit(): void {
  }

  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();
    this.valueSelected.emit(value);
    return this.airports.filter(airport => airport.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
