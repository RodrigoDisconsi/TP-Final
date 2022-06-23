import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLogUsersComponent } from './table-log-users.component';

describe('TableLogUsersComponent', () => {
  let component: TableLogUsersComponent;
  let fixture: ComponentFixture<TableLogUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLogUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLogUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
