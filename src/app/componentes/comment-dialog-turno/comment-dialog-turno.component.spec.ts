import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDialogTurnoComponent } from './comment-dialog-turno.component';

describe('CommentDialogTurnoComponent', () => {
  let component: CommentDialogTurnoComponent;
  let fixture: ComponentFixture<CommentDialogTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentDialogTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentDialogTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
