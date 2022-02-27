import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { ProductsService } from "./products.service";
import { CategoryDto, Message } from "./models/category.dto";
import { CustomerService } from './customer.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  products: any = [];
  categories$: Observable<Message[]>;
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
    this.customerService.getCustomers().subscribe(
      resp => {
        console.log(resp);

      }
    )
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
}
