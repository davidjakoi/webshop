import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-webshop',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './webshop.component.html',
  styleUrl: './webshop.component.css'
})
export class WebshopComponent implements OnInit {
  readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.productsService.getProducts();
  }
}
