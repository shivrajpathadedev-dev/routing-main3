import { Injectable } from '@angular/core';
import { Iproduct, IresProduct } from '../models/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
productsArr:Array<Iproduct>= [
  {
    pname: 'Nike Air Max Shoes',
    pid: '301',
    pstatus: 'Delivered',
    canReturn: 0,
    pimg: 'https://picsum.photos/id/21/200/200'
  },
  {
    pname: 'Adidas Running Shoes',
    pid: '302',
    pstatus: 'In-Progress',
    canReturn: 1,
    pimg: 'https://picsum.photos/id/24/200/200'
  },
  {
    pname: 'Puma Sports Jacket',
    pid: '303',
    pstatus: 'Dispatched',
    canReturn: 1,
    pimg: 'https://picsum.photos/id/28/200/200'
  },
  {
    pname: 'Levis Denim Jeans',
    pid: '304',
    pstatus: 'Delivered',
    canReturn: 0,
    pimg: 'https://picsum.photos/id/29/200/200'
  },
  {
    pname: 'Titan Analog Watch',
    pid: '305',
    pstatus: 'In-Progress',
    canReturn: 1,
    pimg: 'https://picsum.photos/id/30/200/200'
  }
];
  constructor() { }

  fetchProduct():Observable<Iproduct[]>{
    return of(this.productsArr)
  }

  fetchProductId(id:string):Observable<Iproduct>{
    let productObj=this.productsArr.find(t=>t.pid===id)!
    return of(productObj)
  }

  createProduct(product:Iproduct):Observable<IresProduct<Iproduct>>{
  this.productsArr.push(product)
  return of({
    msg:`The Product ${product.pname} is Added Successfully!!!`,
    data:product
  })
  }

  removeProduct(id:string){
    let get_index=this.productsArr.findIndex(t=>t.pid===id)
    let productId=this.productsArr.splice(get_index,1)
    return of({
      msg:`The product ${productId[0].pname} is Removed Successfully!!`,
      data:productId[0]
    })
  }

 updateProduct(product:Iproduct):Observable<IresProduct<Iproduct>>{
  let get_index=this.productsArr.findIndex(t=>t.pid===product.pid)
  this.productsArr[get_index]=product

  return of({
    msg:`The Product ${product.pname} is Updated Succesfully!!`,
    data:product
  })
 }
}
