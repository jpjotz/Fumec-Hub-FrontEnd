import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatItem } from './chat-item';

describe('ChatItem', () => {
  let component: ChatItem;
  let fixture: ComponentFixture<ChatItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
