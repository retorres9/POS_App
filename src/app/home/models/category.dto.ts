export interface CategoryDto {
  status:  number;
  message: Message[];
}

export interface Message {
  category_id:      number;
  category_name:    string;
  category_slug:    string;
  parent_id:        number;
  category_details: string;
  created_at:       string;
  update_at:        string;
}
