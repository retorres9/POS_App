import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ProductsService } from "./products.service";
import {  Message } from "./models/category.dto";
import { CustomerService } from './customer.service';
import { CustomerMessage } from "./models/customer.dto";
import { Cart } from './models/cart.model';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  products: any = [];
  categories$: Observable<Message[]>;
  customers$: Observable<CustomerMessage[]>
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

  goToInvoice() {
    this.router.navigate(["invoice"]);
  }

  addToCart(product: any) {
    const productIdx = this.cart.findIndex(
      (productItem) => productItem.product === product.p_name
    );
    if(productIdx >= 0) {
      ++this.cart[productIdx].qty
      this.cart[productIdx].total =
        this.cart[productIdx].qty * this.cart[productIdx].price
    } else {
      this.cart.push({
        qty: 1,
        product: product.p_name,
        price: product.sell_price,
        total: product.sell_price
      });
    }
    this.getTotal()
  }

  updateTotal() {
    let payAm = this.payableAmount;
    if(this.discount < this.total) {
      this.payableAmount = this.total -  this.discount;
    }
  }

  private getTotal() {
    this.total = this.cart.reduce((total, product) => total + product.total, 0);
    this.payableAmount = this.total;
    this.payableAmount -= this.discount;
  }
}
