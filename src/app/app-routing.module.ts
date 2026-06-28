import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductDashboardComponent } from './component/product-dashboard/product-dashboard.component';
import { UsersComponent } from './component/users/users.component';
import { FairsComponent } from './component/fairs/fairs.component';
import { ProductComponent } from './component/product-dashboard/product/product.component';
import { ProductFormComponent } from './component/product-dashboard/product-form/product-form.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'products',
    component:ProductDashboardComponent,
    children:[
      {
    path:'addProduct',
    component:ProductFormComponent
  },
   {
    path:':pid',
    component:ProductComponent
  },
  {
    path:':pid/edit',
    component:ProductFormComponent
  }
    ]
   },
  {
    path:'users',
    component:UsersComponent
  },
  {
    path:'fairs',
    component:FairsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
