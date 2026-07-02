import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductDashboardComponent } from './component/product-dashboard/product-dashboard.component';
import { ProductComponent } from './component/product-dashboard/product/product.component';
import { ProductFormComponent } from './component/product-dashboard/product-form/product-form.component';
import { UsersDashboardComponent } from './component/users-dashboard/users-dashboard.component';
import { FairsDashboardComponent } from './component/fairs-dashboard/fairs-dashboard.component';
import { UserFormComponent } from './component/users-dashboard/user-form/user-form.component';
import { UserComponent } from './component/users-dashboard/user/user.component';
import { FairsDetailsComponent } from './component/fairs-dashboard/fairs-details/fairs-details.component';

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
    component:UsersDashboardComponent,
    children:[
      {
        path:'adduser',
        component:UserFormComponent
      },
      {
        path:':uid',
        component:UserComponent
      },
      {
        path:':uid/edit',
        component:UserFormComponent
      }
    ]
  },
  {
    path:'fairs',
    component:FairsDashboardComponent,
    children:[
      {
        path:':id',
        component:FairsDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
