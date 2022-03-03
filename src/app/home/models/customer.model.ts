export class Customer {
  constructor(
    public customer_name: string,
    public customer_email: string,
    public customer_mobile: string,
    public nric: string,
    public type: null | string,
    public phone2: null | string,
    public fax: null | string,
    public facebook: null | string,
    public source: null | string,
    public code: null | string,
    public branch: null | string,
    public dob: string,
    public customer_address: null | string,
    public customer_sex: number,
    public customer_age: number | null,
    public customer_city: null | string,
    public customer_state: null | string,
    public customer_country: null,
    public is_giftcard: null | number,
    public created_at: string,
    // public store_id: number
  ) {
    this.customer_name = customer_name;
    this.customer_email = customer_email;
    this.customer_mobile = customer_mobile;
    this.nric = nric;
    this.type = type;
    this.phone2 = phone2;
    this.fax = fax;
    this.facebook = facebook;
    this.source = source;
    this.code = code;
    this.branch = branch;
    this.dob = dob;
    this.customer_address = customer_address;
    this.customer_sex = customer_sex;
    this.customer_age = customer_age;
    this.customer_city = customer_city;
    this.customer_state = customer_state;
    this.customer_country = customer_country;
    this.is_giftcard = is_giftcard;
    this.created_at = created_at;
    // this.store_id = store_id;
  }
}
