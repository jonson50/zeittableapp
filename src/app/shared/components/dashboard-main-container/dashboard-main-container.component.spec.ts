import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainContainerComponent } from './dashboard-main-container.component';

describe('DashboardMainContainerComponent', () => {
  let component: DashboardMainContainerComponent;
  let fixture: ComponentFixture<DashboardMainContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMainContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
