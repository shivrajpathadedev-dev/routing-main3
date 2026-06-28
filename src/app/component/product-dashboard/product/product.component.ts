import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productObj!: Iproduct
  productId!: string
  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _routes: ActivatedRoute,
    private _snackbar: SnackbarService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this._routes.params.subscribe(params => {
    this.productId = params['pid'];

    if (this.productId) {
      this._productService.fetchProductId(this.productId)
        .subscribe({
          next: data => {
            this.productObj = data;
          },
          error: err => console.log(err)
        });
    }
  });
  }

  onRemove() {
    let matConfig = new MatDialogConfig();
    matConfig.width = '400px';
    matConfig.disableClose = true;
    matConfig.data = 'Are you sure do you want to remove this product?';

    let dialogRef = this._matDialog.open(GetConfirmComponent, matConfig);
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {  
          this._productService.removeProduct(this.productId)
            .subscribe({
              next: data => {
                this._snackbar.openSuccesssnackbar(data.msg)
                this._productService.fetchProduct()
                
                  .subscribe(products => {
                    if (products.length > 0) {
                      this._router.navigate(['/products', products[0].pid]);
                    } else {
                      this._router.navigate(['/products']);
                    }
                  });
              },
              error: err => {
                this._snackbar.openErrorsnackbar(err.error?.msg || 'Something went wrong');
              }
            });
        }
           else {
      // NO
      this._snackbar.openErrorsnackbar('Product removal cancelled');
      this._router.navigate(['/products']);
        }
      });
  }
}