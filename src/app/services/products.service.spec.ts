import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const cartItem: CartItem = { id: '1', name: 'Mock cart item', amount: 10, price: 200 };
  const mockProduct: Product = { id: '1', name: 'Mock product', img: 'mock.jpg', availableAmount: 100, minOrderAmount: 10, price: 10 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    service.products.set([{...mockProduct}]);
    service.cart.set([]);
    service.isLoading = false;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products and set isLoading', () => {
    service.getProducts();
    expect(service.isLoading).toBeTrue();

    const req = httpMock.expectOne('https://63c10327716562671870f959.mockapi.io/products');
    expect(req.request.method).toBe('GET');
    req.flush([mockProduct]);

    expect(service.products()).toEqual([mockProduct]);
    expect(service.isLoading).toBeFalse();
  });

  it('should add new product to cart', () => {
    service.addProductToCart('1', '2');
    expect(service.cart().length).toBe(1);
    expect(service.cart()[0].amount).toBe(2);
    expect(service.cart()[0].price).toBe(20);
    expect(service.products()[0].availableAmount).toBe(98);
  });

  it('should add amount to existing cart item', () => {
    service.cart.set([cartItem]);
    service.addProductToCart('1', '3');
    expect(service.cart()[0].amount).toBe(13);
    expect(service.cart()[0].price).toBe(230);
    expect(service.products()[0].availableAmount).toBe(97);
  });

  it('should delete item from cart and restore product amount', () => {
    service.addProductToCart('1', '10');
    service.deleteItemFromCart('1');
    expect(service.cart().length).toBe(0);
    expect(service.products()[0].availableAmount).toBe(100);
  });
});