import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomRangePageComponent } from './zoom-range-page.component';

describe('ZoomRangePageComponent', () => {
  let component: ZoomRangePageComponent;
  let fixture: ComponentFixture<ZoomRangePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoomRangePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoomRangePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
