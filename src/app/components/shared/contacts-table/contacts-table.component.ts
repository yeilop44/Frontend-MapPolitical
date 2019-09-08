import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalDetalleContactoComponent } from '../../afiliados/modal-detalle-contacto/modal-detalle-contacto.component';
import { AffiliatesService } from 'src/app/services/affiliates.service';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html'
})
export class ContactsTableComponent implements OnInit {

  @Input() item: any; 
  @Input() index: string;

  affiliates: number;
  bsModalRef: BsModalRef;

  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  
  constructor(private _modalService: BsModalService, private _contactService: AffiliatesService) { }

  ngOnInit() {
  }

  openModalContactDetail(){
    const initialState = { 
      names: this.item.names, 
      surnames: this.item.surnames,
      identification: this.item.identification,
      phone: this.item.phone,
      birthdate: this.item.birthdate,
      votingStation: this.item.votingStation,
      votingTable: this.item.votingTable,
      leader: this.item.leader,
      subdivision: this.item.subdivision
    };
    this.bsModalRef = this._modalService.show(ModalDetalleContactoComponent, Object.assign({}, { class: 'gray modal-lg', initialState }));    
    
  }

  deleteContact(){
    if (confirm('Esta seguro de Eliminar este afiliado?')) {
      this.deleteEvent.emit(this.item);      
    }

  }

  editContact(){

  }

}
