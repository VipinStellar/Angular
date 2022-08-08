import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInComponent } from './media-in.component';

describe('MediaInComponent', () => {
  let component: MediaInComponent;
  let fixture: ComponentFixture<MediaInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
