import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-start-page-guest',
  templateUrl: './start-page-guest.component.html',
  styleUrls: ['./start-page-guest.component.scss']
})
export class StartPageGuestComponent implements OnInit {

  @Output() goToListEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  goToList(list: string) {
    this.goToListEvent.emit(list);
  }
}