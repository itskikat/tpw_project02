import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyAccountComponent } from './dialog-body-account.component';

describe('DialogBodyAccountComponent', () => {
  let component: DialogBodyAccountComponent;
  let fixture: ComponentFixture<DialogBodyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBodyAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
