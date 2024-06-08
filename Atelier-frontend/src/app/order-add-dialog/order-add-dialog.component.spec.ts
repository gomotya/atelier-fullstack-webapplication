import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddDialogComponent } from './order-add-dialog.component';

describe('OrderAddDialogComponent', () => {
  let component: OrderAddDialogComponent;
  let fixture: ComponentFixture<OrderAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
