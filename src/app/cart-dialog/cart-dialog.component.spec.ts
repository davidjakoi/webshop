import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDialogComponent } from './cart-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('CartDialogComponent', () => {
  let component: CartDialogComponent;
  let fixture: ComponentFixture<CartDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CartDialogComponent>>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  const mockProduct = {
    id: '1',
    name: 'Mock Product',
    img: 'mock.jpg',
    availableAmount: 100,
    minOrderAmount: 5,
    price: 10
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['addProductToCart']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [CartDialogComponent, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { product: mockProduct } },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should call addProductToCart, close dialog, and show snackbar when addToCart is called', () => {
    component.amount.setValue("10");
    component.addToCart();
    expect(productsServiceSpy.addProductToCart).toHaveBeenCalledWith(mockProduct.id, "10");
    expect(dialogRefSpy.close).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Product successfully added to your cart!',
      '',
      jasmine.objectContaining({
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    );
  });

  it('should have invalid form if value is less than minOrderAmount', () => {
    component.amount.setValue("1");
    expect(component.amount.invalid).toBeTrue();
  });

  it('should have invalid form if value is more than availableAmount', () => {
    component.amount.setValue("105");
    expect(component.amount.invalid).toBeTrue();
  });

  it('should have valid form if value is within range', () => {
    component.amount.setValue("50");
    expect(component.amount.valid).toBeTrue();
  });
});