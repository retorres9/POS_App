import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any = [];
  constructor(private router: Router, private productService: ProductsService) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  searchProduct(product: string) {
    this.productService.getProducts(product).subscribe(
      resp => {
        this.products = resp;
        console.log(resp);

      }
    )
  }

  goToInvoice() {
    this.router.navigate(['invoice']);
  }

}
