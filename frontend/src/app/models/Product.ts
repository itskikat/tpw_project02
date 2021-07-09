import {Category} from "./Category";
import {Brand} from "./Brand";

export class Product {
  id: number;
  name: string;
  description: string;
  category: Category[];
  brand: Brand;
  price: number;
  quantity: number;
  image: HTMLImageElement;

  /* constructor(id: number, name: string, description: string, category: Category[], brand: Brand, price: number, quantity: number, image: HTMLImageElement) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.brand = brand;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
  }
*/


}
