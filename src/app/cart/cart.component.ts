import { Component, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CartItem } from '../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @ViewChild(MatTable) table!: MatTable<CartItem[]>;
  displayedColumns: string[] = ['name', 'amount', 'price', 'deleteItem'];
  readonly productsService = inject(ProductsService);

  deleteItem(id: string) {
    this.productsService.deleteItemFromCart(id);
    this.table.renderRows();
  }

  getTotalPrice() {
    return this.productsService.cart().map(cartItem => cartItem.price).reduce((a, b) => a + b);
  }
}
