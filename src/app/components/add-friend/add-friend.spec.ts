import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFriend } from './add-friend';

describe('AddFriend', () => {
  let component: AddFriend;
  let fixture: ComponentFixture<AddFriend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFriend],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFriend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
