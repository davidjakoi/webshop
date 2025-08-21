import { Component } from '@angular/core';
import { WebshopComponent } from "./webshop/webshop.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WebshopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
