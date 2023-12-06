import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnteProyectoComponent } from './viewanteproyecto.component';

describe('ViewAnteProyectoComponent', () => {
  let component: ViewAnteProyectoComponent;
  let fixture: ComponentFixture<ViewAnteProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAnteProyectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAnteProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});