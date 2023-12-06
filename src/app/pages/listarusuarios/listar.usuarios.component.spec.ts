import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../services/user.service';

describe('ListarUserComponent', () => {
  let component: UserService;
  let fixture: ComponentFixture<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});