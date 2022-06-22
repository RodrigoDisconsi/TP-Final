import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimosTurnosComponent } from './ultimos-turnos.component';

describe('UltimosTurnosComponent', () => {
  let component: UltimosTurnosComponent;
  let fixture: ComponentFixture<UltimosTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimosTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimosTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
