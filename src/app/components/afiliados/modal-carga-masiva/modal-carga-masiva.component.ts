import {Component, Inject, Injector, OnInit, PLATFORM_ID, ViewChild, AfterViewInit} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-modal-carga-masiva',
  templateUrl: './modal-carga-masiva.component.html',
  styleUrls: ['./modal-carga-masiva.component.css']
})
export class ModalCargaMasivaComponent {
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
