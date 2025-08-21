import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule
  ],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css'
})
export class CartDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CartDialogComponent>);
  readonly data = inject<{ product: Product }>(MAT_DIALOG_DATA);
  readonly productsService = inject(ProductsService);
  private _snackBar = inject(MatSnackBar);
  amount = new FormControl('', [Validators.required, Validators.min(this.data.product.minOrderAmount), Validators.max(this.data.product.availableAmount)]);

  closeDialog(): void {
    this.dialogRef.close();
  }

  addToCart() {
    this.productsService.addProductToCart(this.data.product.id, this.amount.value!);
    this.dialogRef.close();
    this._snackBar.open('Product successfully added to your cart!', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
