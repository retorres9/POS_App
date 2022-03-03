import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Customer } from '../models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      customer_name: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      customer_email: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      customer_mobile: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      nric: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      type: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      phone2: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      fax: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      facebook: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      source: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      code: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      branch: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      dob: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      customer_address: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      customer_sex: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      customer_city: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      customer_state: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      customer_country: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });
  }

  postCustomer() {
    const customerValues = this.customerForm.value;
    const customer = new Customer(
      customerValues.customer_name,
      customerValues.customer_email,
      customerValues.customer_mobile,
      customerValues.nric,
      customerValues.type,
      customerValues.phone2,
      customerValues.fax,
      null,
      null,
      customerValues.code,
      customerValues.branch,
      customerValues.dob,
      customerValues.address,
      customerValues.customer_sex,
      customerValues.customer_age,
      customerValues.customer_city,
      customerValues.customer_state,
      customerValues.customer_country,
      null,
      new Date().toISOString()
    )
    this.customerService.postCustomer(customer).subscribe();
  }
}
