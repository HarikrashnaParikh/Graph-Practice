import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectedForcedComponent } from './directed-forced.component';

describe('DirectedForcedComponent', () => {
  let component: DirectedForcedComponent;
  let fixture: ComponentFixture<DirectedForcedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectedForcedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectedForcedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
