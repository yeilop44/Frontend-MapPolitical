import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarComponent } from './cambiar.component';

describe('CambiarComponent', () => {
  let component: CambiarComponent;
  let fixture: ComponentFixture<CambiarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
