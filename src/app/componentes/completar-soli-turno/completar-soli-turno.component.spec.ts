import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarSoliTurnoComponent } from './completar-soli-turno.component';

describe('CompletarSoliTurnoComponent', () => {
  let component: CompletarSoliTurnoComponent;
  let fixture: ComponentFixture<CompletarSoliTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletarSoliTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletarSoliTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
