import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddDialogComponent } from './client-add-dialog.component';

describe('ClientAddDialogComponent', () => {
  let component: ClientAddDialogComponent;
  let fixture: ComponentFixture<ClientAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
