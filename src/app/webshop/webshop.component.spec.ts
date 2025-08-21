import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebshopComponent } from './webshop.component';
import { ProductsService } from '../services/products.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('WebshopComponent', () => {
  let component: WebshopComponent;
  let fixture: ComponentFixture<WebshopComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [WebshopComponent, RouterTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProductsService, useValue: spy }
      ]
    }).compileComponents();
 
    fixture = TestBed.createComponent(WebshopComponent);
    component = fixture.componentInstance;
    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a span with page title "Webshop"', () => {
    const titleElement: HTMLElement = fixture.nativeElement;
    const span = titleElement.querySelector('span')!;
    expect(span.textContent).toEqual('Webshop');
  });

  it('should call getProducts on ngOnInit', () => {
    productsServiceSpy.getProducts.and.stub();
    component.ngOnInit();
    expect(productsServiceSpy.getProducts).toHaveBeenCalled();
  });
});
