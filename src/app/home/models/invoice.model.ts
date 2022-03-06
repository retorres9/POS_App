export interface Invoice {
  invoice_id:      number;
  products:        Product[];
  created_by:      number;
  created_at:      Date;
  total_items:     number;
  invoice_notes:   string;
  customer_id:     number;
  pmethod_id:      number;
  subtotal:        number;
  descuento_monto: number;
  impuesto:        number;
  pagable_monto:   number;
  monto_pagado:    number;
  store_id:        number;
  inv_type:        string;
}

export interface Product {
  producto: number;
  cantidad: number;
}
