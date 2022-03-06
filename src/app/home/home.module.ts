import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [HomeComponent, CustomerComponent, InvoiceComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, ReactiveFormsModule]
})
export class HomeModule {}
