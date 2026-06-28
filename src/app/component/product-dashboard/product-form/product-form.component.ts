import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  isInEditMode: boolean = false
  productform!: FormGroup
  productId!: string
  constructor(
    private _productservice: ProductService,
    private _router: Router,
    private _routers: ActivatedRoute,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.createProductForm()
    this.patchProductData()
  }


  createProductForm() {
    this.productform = new FormGroup({
      pname: new FormControl(null, [Validators.required]),
      pstatus: new FormControl('In-Progress'),
      canReturn: new FormControl(0),
      pimg: new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    if (this.productform.invalid) {
      this.productform.markAllAsTouched()
      return
    } else {
      let productObj = {
        ...this.productform.value,
        pid: Date.now().toString()
      }
      this._productservice.createProduct(productObj)
        .subscribe({
          next: data => {
            this.productform.reset()
            this._router.navigate(['/products',productObj.pid])
            this._snackbar.openSuccesssnackbar(data.msg)
          },
          error: err => {
            this._snackbar.openErrorsnackbar(err.msg)
          }
        })
    }
  }

  patchProductData() {
    this.productId = this._routers.snapshot.paramMap.get('pid')!
    if (this.productId) {
      this.isInEditMode = true;
      this._productservice.fetchProductId(this.productId)
        .subscribe({
          next: data => {
            this.productform.patchValue(data)
            this._snackbar.openSuccesssnackbar(`The Product Data Is successfully Patch!!`)
          },
          error: err => {
            this._snackbar.openErrorsnackbar(err)
          }
        })
    }
  }

  onUpdateProduct() {
    if (this.productform.invalid) {
      this.productform.markAllAsTouched();
      return;
    }

    let upd_obj = {
      ...this.productform.value,
      pid: this.productId
    };

    this._productservice.updateProduct(upd_obj)
      .subscribe({
        next: data => {
          this.isInEditMode = false;
          this._router.navigate(['/products',upd_obj.pid]);
          this._snackbar.openSuccesssnackbar(data.msg);
        },
        error: err => {
          this._snackbar.openErrorsnackbar(
            err.error?.msg || 'Product update failed'
          );
        }
      });
  }
}