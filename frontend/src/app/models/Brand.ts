import {Category} from "./Category";

export class Brand {
  id: number;
  name: string;
  category: Category[];
  image: HTMLImageElement;

  constructor(id: number, name: string, category: Category[], image: HTMLImageElement) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.image = image;
  }

}