export class Category {
  id: number;
  name: string;
  image: HTMLImageElement;

  constructor(id: number, name: string, image: HTMLImageElement) {
    this.id = id;
    this.name = name;
    this.image = image;
  }

}