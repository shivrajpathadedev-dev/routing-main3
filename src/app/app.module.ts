import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { FairsComponent } from './component/fairs/fairs.component';
import { ProductDashboardComponent } from './component/product-dashboard/product-dashboard.component';
import { UsersComponent } from './component/users/users.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PathNotFoundComponent } from './component/path-not-found/path-not-found.component';
import { ProductFormComponent } from './component/product-dashboard/product-form/product-form.component';
import { ProductComponent } from './component/product-dashboard/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetConfirmComponent } from './component/get-confirm/get-confirm.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FairsComponent,
    ProductDashboardComponent,
    UsersComponent,
    PathNotFoundComponent,
    ProductFormComponent,
    ProductComponent,
    GetConfirmComponent
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
MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
