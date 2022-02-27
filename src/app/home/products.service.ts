import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { CategoryDto } from './models/category.dto';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Category } from './models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _categories$: BehaviorSubject<CategoryDto[]> = new BehaviorSubject<CategoryDto[]>([]);
  constructor(private http: HttpClient) { }

  getProducts() {
    const body = {
      "store_id": 1,
      "skip": 0,
      "limit": 10
    }
    return this.http.post('http://apicarryt.us-east-1.elasticbeanstalk.com/product', body);
  }

  getProductByCode(prod) {
    let headers = new HttpHeaders().set(
        'Content-Type', 'application/json'
    );
    // const body =
    let req = JSON.stringify({
      "store_id": 1,
      "skip": 0,
      "limit": 5,
      "query": `${prod}`
    });
    return this.http.post<Product>('http://apicarryt.us-east-1.elasticbeanstalk.com/product/query', JSON.stringify({
      "store_id": 1,
      "skip": 0,
      "limit": 5,
      "query": `${prod}`
    }), {headers: headers})
  }

  getCategories() {
    return this.http.get<CategoryDto>('http://apicarryt.us-east-1.elasticbeanstalk.com/product/category').pipe(
      map(resp => {
        const categories = [];
        const message = resp.message;
        for (const key in message) {
          if (resp.message.hasOwnProperty(key)) {
            categories.push(new Category(
              message[key].category_id,
              message[key].category_name,
              message[key].category_slug,
              message[key].parent_id,
              message[key].category_details,
              message[key].created_at,
              message[key].update_at
            ));
          }
        }
        return categories;
      }), tap((categories) => {
        return this._categories$.next(categories);
      })
    );
  }
}
