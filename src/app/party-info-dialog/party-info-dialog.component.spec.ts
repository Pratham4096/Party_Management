import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyInfoDialogComponent } from './party-info-dialog.component';

describe('PartyInfoDialogComponent', () => {
  let component: PartyInfoDialogComponent;
  let fixture: ComponentFixture<PartyInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
