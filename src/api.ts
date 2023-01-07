export interface MenuGroupDTO {
    id: string;
    name: string;
    type: string;
    dishes: DishDTO[];
  }

  export interface AttributeDTO {
    dish_attributes_id: string;
    id: string;
    name: string
}

  export interface DishDTO {
    id: string;
    name: string;
    price: string;
    status: string;
    description?: string;
    attributes: AttributeDTO[];
  }
