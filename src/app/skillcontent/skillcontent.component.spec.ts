import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillcontentComponent } from './skillcontent.component';

describe('SkillcontentComponent', () => {
  let component: SkillcontentComponent;
  let fixture: ComponentFixture<SkillcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillcontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
