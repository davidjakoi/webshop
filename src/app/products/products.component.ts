import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgOptimizedImage, MatButtonModule, MatFormFieldModule, MatInputModule, MatLabel, MatProgressSpinnerModule, MatTableModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  readonly dialog = inject(MatDialog);
  readonly productsService = inject(ProductsService)
  displayedColumns: string[] = ['name', 'image', 'availableAmount', 'minOrderAmount', 'price', 'addToCart'];

  openDialog(product: Product): void {
    this.dialog.open(CartDialogComponent, {
      data: {
        product
      }
    });
  }
}
