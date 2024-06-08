import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAddDialogComponent } from './service-add-dialog.component';

describe('ServiceAddDialogComponent', () => {
  let component: ServiceAddDialogComponent;
  let fixture: ComponentFixture<ServiceAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
