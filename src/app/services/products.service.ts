import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  #http = inject(HttpClient);
  public cart = signal<CartItem[]>([]);
  public products = signal<Product[]>([]);
  public isLoading = false;

  getProducts(): void {
    this.isLoading = true;
    this.#http.get<Product[]>('https://63c10327716562671870f959.mockapi.io/products').subscribe((products: Product[]) => {
      this.products.set(products);
      this.isLoading = false;
    });
  }

  addProductToCart(id: string, value: string) {
    const product = this.products().find(product => product.id === id)!;
    const productInCart = this.cart().find(product => product.id === id);
    if (productInCart) {
      this.addAmountToExistingCartItem(product, productInCart, value)
    } else if (product) {
      this.addNewProductToCart(product, id, value);
    }
  }

  addAmountToExistingCartItem(product: Product, productInCart: CartItem, value: string) {
    product.availableAmount -= parseInt(value);
    productInCart.amount += parseInt(value as string);
    productInCart.price += parseInt(value) * product?.price;
  }

  addNewProductToCart(product: Product, id: string, value: string) {
    product.availableAmount -= parseInt(value);
    this.cart().push({
      amount: parseInt(value),
      id,
      name: product.name,
      price: parseInt(value) * product?.price
    });
  }

  deleteItemFromCart(id: string) {
    const index = this.cart().findIndex(item => item.id === id.toString());
    const deletedItem = this.cart().splice(index, 1);
    const productIndex = this.products().findIndex(product => product.id === id.toString());
    this.products()[productIndex].availableAmount += deletedItem[0].amount;
  }

}
