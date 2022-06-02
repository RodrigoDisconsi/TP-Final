import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUsuariosComponent } from './master-usuarios.component';

describe('MasterUsuariosComponent', () => {
  let component: MasterUsuariosComponent;
  let fixture: ComponentFixture<MasterUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
