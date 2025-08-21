import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductsService } from '../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let isLoading = false;

  beforeEach(async () => {
    isLoading = false;
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['products'], {
      get isLoading() { return isLoading; }
    });
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    productsServiceSpy.products.and.returnValue([
      { id: '1', name: 'Mock product', img: 'mock.jpg', availableAmount: 100, minOrderAmount: 10, price: 10 }
    ]);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, MatProgressSpinnerModule, MatTableModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog when Add to cart is clicked', () => {
    isLoading = false;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button[aria-label="Open dialog"]');
    button.click();
    expect(dialogSpy.open).toHaveBeenCalled();
  });
});