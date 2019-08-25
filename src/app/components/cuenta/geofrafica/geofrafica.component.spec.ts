import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofraficaComponent } from './geofrafica.component';

describe('GeofraficaComponent', () => {
  let component: GeofraficaComponent;
  let fixture: ComponentFixture<GeofraficaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofraficaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
