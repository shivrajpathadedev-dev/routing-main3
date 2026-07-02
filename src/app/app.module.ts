import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { ProductDashboardComponent } from './component/product-dashboard/product-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PathNotFoundComponent } from './component/path-not-found/path-not-found.component';
import { ProductFormComponent } from './component/product-dashboard/product-form/product-form.component';
import { ProductComponent } from './component/product-dashboard/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetConfirmComponent } from './component/get-confirm/get-confirm.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UsersDashboardComponent } from './component/users-dashboard/users-dashboard.component';
import { UserComponent } from './component/users-dashboard/user/user.component';
import { UserFormComponent } from './component/users-dashboard/user-form/user-form.component';
import { FairsDashboardComponent } from './component/fairs-dashboard/fairs-dashboard.component';
import { FairsCardComponent } from './component/fairs-dashboard/fairs-card/fairs-card.component';
import { FairsDetailsComponent } from './component/fairs-dashboard/fairs-details/fairs-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductDashboardComponent,
    PathNotFoundComponent,
    ProductFormComponent,
    ProductComponent,
    GetConfirmComponent,
    UsersDashboardComponent,
    UserComponent,
    UserFormComponent,
    FairsDashboardComponent,
    FairsCardComponent,
    FairsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
     FormsModule,
    ReactiveFormsModule,
MatDialogModule,
MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
