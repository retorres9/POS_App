export interface Product {
  status:    number;
  registros: Registro[];
  message:   Message;
}

export interface Message {
  p_id:                  number;
  p_type:                PType;
  p_code:                string;
  p_name:                string;
  categorys_category_id: number;
  units_unit_id:         number;
  sell_price:            number;
  quantity_in_stock:     number;
  status:                number;
}

export enum PType {
  Product = "product",
}

export interface Registro {
  record: number;
}
