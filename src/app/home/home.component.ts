import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ProductsService } from "./products.service";
import { Message } from "./models/category.dto";
import { CustomerService } from "./customer.service";
import { CustomerMessage } from "./models/customer.dto";
import { Cart } from "./models/cart.model";
import { Invoice } from "./models/invoice.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  invoice: Invoice = {
    invoice_id: 0,
    pagable_monto: 0,
    inv_type: "",
    invoice_notes: "",
    products: [],
    created_by: 1,
    created_at: new Date(),
    total_items: 0,
    customer_id: 123,
    pmethod_id: 1,
    subtotal: 0,
    descuento_monto: 0,
    impuesto: 12,
    monto_pagado: 0,
    store_id: 2,
  };

  discountType: string = "dollar";
  products: any = [];
  categories$: Observable<Message[]>;
  customers$: Observable<CustomerMessage[]>;
  cart: Cart[] = [];

  total: number = 0;
  payableAmount: number = 0;
  discount: number = 0;
  constructor(
    private router: Router,
    private productService: ProductsService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((resp) => {
      console.log(resp);
    });
    this.categories$ = this.productService.getCategories();
    this.customers$ = this.customerService.getCustomers();
  }

  searchProduct(product: string) {
    this.productService.getProductByCode(product).subscribe((resp) => {
      this.products = resp.message;
      console.log(resp.message);
    });
  }

  addToCart(product: any) {
    const productIdx = this.cart.findIndex(
      (productItem) => productItem.product === product.p_name
    );
    if (productIdx >= 0) {
      ++this.cart[productIdx].qty;
      this.cart[productIdx].total =
        this.cart[productIdx].qty * this.cart[productIdx].price;
    } else {
      this.cart.push({
        qty: 1,
        product: product.p_name,
        price: product.sell_price,
        total: product.sell_price,
      });
    }
    this.getTotal();
    this.getItems();
  }

  resetDiscount() {
    this.discount = 0;
    this.payableAmount = this.total;

  }

  updateTotal() {
    this.getDiscount();
    // let payAm = this.payableAmount;
    // if (this.discount < this.total) {
    //   this.payableAmount = this.total - this.discount;
    // }
  }

  updateQty(i, event) {
    this.cart[i].total = this.cart[i].price * event.target.value;
    this.getTotal();
    this.getItems();
  }

  setMaxDiscount(): number {
    if (this.discountType === 'dollar') {
      return this.total;
    } else if (this.discountType === 'percentage') {
      return 100;
    }
  }

  private getTotal() {
    this.total = this.cart.reduce((total, product) => total + product.total, 0);
    this.payableAmount = this.total;
    this.payableAmount -= this.discount;
    this.invoice.subtotal = this.payableAmount;
  }

  private getItems() {
    this.invoice.total_items = this.cart.length;
  }

  private getDiscount() {
    this.discountType === 'dollar' ? this.calculateDiscount(): this.calculateDicountPercentage();
  }

  private calculateDicountPercentage() {
    let subtotal = this.total - this.total * (this.discount / 100);
    this.invoice.descuento_monto = this.total * (this.discount / 100);
    this.invoice.subtotal = this.total;
    this.payableAmount = subtotal;
    this.invoice.pagable_monto = subtotal;
  }

  private calculateDiscount() {
    let subtotal = this.total - this.discount;
    this.invoice.descuento_monto = this.discount;
    this.invoice.subtotal = subtotal;
    this.invoice.pagable_monto = subtotal;
    this.payableAmount = subtotal;
  }
}
