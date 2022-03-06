import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-invoice-comp',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @Input() cart: Cart[];
  @Input() invoice: Invoice;
  change: number = 0;
  cant: {[k: string]: string} = {
    "=0": "No items", "=1": "1 item", "other": "# items"
  }
  constructor() { }

  ngOnInit(): void {
  }

  printCart() {
    console.log(this.cart);
    console.log(this.invoice);
  }

  setAllPaid() {
    this.invoice.monto_pagado = this.invoice.pagable_monto;
    this.change = this.invoice.monto_pagado - this.invoice.pagable_monto;
  }

  setPaid() {
    this.change = this.invoice.monto_pagado - this.invoice.pagable_monto;
  }

}
