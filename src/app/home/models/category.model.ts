export class Category {
  constructor(
    public category_id: number,
    public category_name: string,
    public category_slug: string,
    public parent_id: number,
    public category_details: string,
    public created_at: string,
    public update_at: string
  ) {}
}
