import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookListsComponent } from './my-book-lists.component';

describe('MyBookListsComponent', () => {
  let component: MyBookListsComponent;
  let fixture: ComponentFixture<MyBookListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBookListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyBookListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
