import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '../models/product.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatTableModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  readonly responsive = inject(BreakpointObserver);
  readonly dialog = inject(MatDialog);
  readonly productsService = inject(ProductsService)
  displayedColumns: string[] = ['name', 'image', 'availableAmount', 'minOrderAmount', 'price', 'addToCart'];
  isPhoneSize = false;

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.HandsetPortrait)
      .subscribe(result => {
        if (result.matches) {
          this.isPhoneSize = true;
          this.displayedColumns = ['name', 'availableAmount', 'minOrderAmount', 'price'];
        }
      });
  }

  openDialog(product: Product): void {
    this.dialog.open(CartDialogComponent, {
      data: {
        product
      }
    });
  }
}
