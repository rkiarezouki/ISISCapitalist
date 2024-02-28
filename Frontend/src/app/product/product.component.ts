import { AppComponent } from '../app.component';
import { Product } from '../world';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyProgressBarComponent } from './ProgressComponent';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AppComponent, ProductComponent, MyProgressBarComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent {


  product: Product = new Product();
  @Input()
  set prod(value: Product) {
    this.product = value;
  }

}


