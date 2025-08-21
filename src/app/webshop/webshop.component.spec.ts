import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebshopComponent } from './webshop.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('WebshopComponent', () => {
  let component: WebshopComponent;
  let fixture: ComponentFixture<WebshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebshopComponent, RouterTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WebshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a span with page title "Webshop"', () => {
    const titleElement: HTMLElement = fixture.nativeElement;
    const span = titleElement.querySelector('span')!;
    expect(span.textContent).toEqual('Webshop');
  });
});
