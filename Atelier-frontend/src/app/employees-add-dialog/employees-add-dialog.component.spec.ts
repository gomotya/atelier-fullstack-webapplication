import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesAddDialogComponent } from './employees-add-dialog.component';

describe('EmployeesAddDialogComponent', () => {
  let component: EmployeesAddDialogComponent;
  let fixture: ComponentFixture<EmployeesAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
