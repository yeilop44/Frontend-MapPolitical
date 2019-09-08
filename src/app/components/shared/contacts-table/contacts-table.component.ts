import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html'
})
export class ContactsTableComponent implements OnInit {

  @Input() pageOfItems: any[]; 

  affiliates: number;
  
  constructor() { }

  ngOnInit() {
  }

}
