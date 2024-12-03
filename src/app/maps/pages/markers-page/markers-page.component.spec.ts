import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkersPageComponent } from './markers-page.component';

describe('MarkersPageComponent', () => {
  let component: MarkersPageComponent;
  let fixture: ComponentFixture<MarkersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
