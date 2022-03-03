export interface CustomerDto {
  status:  number;
  message: CustomerMessage[];
}

export interface CustomerMessage {
  customer_id:      number;
  customer_name:    string;
  customer_email:   string;
  customer_mobile:  string;
  nric:             string;
  type:             null | string;
  phone2:           null | string;
  fax:              null | string;
  facebook:         null | string;
  source:           null | string;
  code:             null | string;
  branch:           null | string;
  dob:              string;
  customer_address: null | string;
  customer_sex:     number;
  customer_age:     number | null;
  customer_city:    null | string;
  customer_state:   null | string;
  customer_country: null;
  is_giftcard:      number | null;
  created_at:       string;
}
