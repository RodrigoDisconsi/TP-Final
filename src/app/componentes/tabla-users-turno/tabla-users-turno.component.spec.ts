import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUsersTurnoComponent } from './tabla-users-turno.component';

describe('TablaUsersTurnoComponent', () => {
  let component: TablaUsersTurnoComponent;
  let fixture: ComponentFixture<TablaUsersTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaUsersTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaUsersTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
