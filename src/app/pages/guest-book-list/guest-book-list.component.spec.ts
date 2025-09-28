import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestBookListComponent } from './guest-book-list.component';

describe('GuestBookListComponent', () => {
  let component: GuestBookListComponent;
  let fixture: ComponentFixture<GuestBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestBookListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuestBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
