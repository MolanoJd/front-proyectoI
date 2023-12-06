import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnteproyectoService } from '../../services/anteproyecto.service';

describe('ViewCategoriasComponent', () => {
  let component: AnteproyectoService;
  let fixture: ComponentFixture<AnteproyectoService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnteproyectoService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnteproyectoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});