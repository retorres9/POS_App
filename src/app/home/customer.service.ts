import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerDto } from './models/customer.dto';
import { map, take, tap, BehaviorSubject } from 'rxjs';
import { Customer } from './models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customers$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  public get customers$(): BehaviorSubject<Customer[]> {
    return this._customers$;
  }

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<CustomerDto>('http://apicarryt.us-east-1.elasticbeanstalk.com/customer').pipe(
      map(resp => {
        const clients = []
        const message = resp.message
        for (const key in message) {
          if (message.hasOwnProperty(key)) {
            clients.push(new Customer(
              message[key].customer_name,
              message[key].customer_email,
              message[key].customer_mobile,
              message[key].nric,
              message[key].type,
              message[key].phone2,
              message[key].fax,
              message[key].facebook,
              message[key].source,
              message[key].code,
              message[key].branch,
              message[key].dob,
              message[key].customer_address,
              message[key].customer_sex,
              message[key].customer_age,
              message[key].customer_city,
              message[key].customer_state,
              message[key].customer_country,
              message[key].is_giftcard,
              message[key].created_at,
              // message[key].store_id
            ));
          }
        }
        return clients;
      }), take(1),
      tap(customer => {
        return this._customers$.next(customer);
      })
    );
  }

  postCustomer(customer) {
    return this.http.post('http://apicarryt.us-east-1.elasticbeanstalk.com/customer/add', customer);
  }
}
