import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { ProductsService } from '../services/products.service';
import { CartItem } from '../models/cart.model';
import { signal } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['deleteItemFromCart'], {
      cart: signal<CartItem[]>([
        { id: '1', name: 'Cart Item 1', amount: 10, price: 50 },
        { id: '2', name: 'Cart Item 2', amount: 20, price: 100 }
      ])
    });

    await TestBed.configureTestingModule({
      imports: [CartComponent, RouterTestingModule],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteItemFromCart and renderRows when deleteItem is called', () => {
    component.table = jasmine.createSpyObj('MatTable', ['renderRows']);
    component.deleteItem('1');
    expect(productsServiceSpy.deleteItemFromCart).toHaveBeenCalledWith('1');
    expect(component.table.renderRows).toHaveBeenCalled();
  });

  it('should calculate total price', () => {
    const total = component.getTotalPrice();
    expect(total).toBe(150);
  });
});