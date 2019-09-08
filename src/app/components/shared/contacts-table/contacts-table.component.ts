import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html'
})
export class ContactsTableComponent implements OnInit {

  @Input() item: any; 
  @Input() index: string;

  itemPrueba: any = {
    nombre: "Mark Antony",
    cedula: 12012255,
    telefono: 1245887,
    cumpleanios:"10-05-1989",
    barrio: "el prado",
    mesaVotacion: "mesa 1",
    lider: "Jonathan Vëlez"
  };
  
  affiliates: number;
  
  constructor() { }

  ngOnInit() {
  }

}
