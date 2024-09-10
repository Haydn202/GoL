import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolComponent } from './gol.component';

describe('GoLComponent', () => {
  let component: GolComponent;
  let fixture: ComponentFixture<GolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
