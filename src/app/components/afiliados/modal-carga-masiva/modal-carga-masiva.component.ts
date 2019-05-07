import {Component, Inject, Injector, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-modal-carga-masiva',
  templateUrl: './modal-carga-masiva.component.html',
  styleUrls: ['./modal-carga-masiva.component.css']
})
export class ModalCargaMasivaComponent implements OnInit {
  @ViewChild('content') content: any;
  closeResult: string;
  private modalService: NgbModal;


  constructor(
      @Inject(PLATFORM_ID) private platformId: Object, private injector: Injector
  ) {
    if(isPlatformBrowser(this.platformId)){
      this.modalService = this.injector.get(NgbModal);
    }
  }

  ngOnInit() {
  }

  open() {
    // and use the reference from the component itself
    this.modalService.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
    });
  }

}
