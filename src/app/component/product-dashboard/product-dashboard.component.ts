import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
productArr:Array<Iproduct>=[]
  constructor(
    private _productservice:ProductService,
    private _router:Router
  ) { }

  ngOnInit(): void {
  this._productservice.fetchProduct()
    .subscribe({
      next: data => {
        this.productArr = data;

        if (
          this.productArr.length > 0 &&
          this._router.url === '/product'
        ) {
          this._router.navigate([
            '/product',
            this.productArr[0].pid
          ]);
        }
      },
      error: err => {
        console.log(err);
      }
    });
}
}
