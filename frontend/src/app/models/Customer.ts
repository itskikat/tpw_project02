import {User} from "./User";

export class Customer {
  id: number;
  user: User;

  constructor(id: number, user: User) {
    this.id = id;
    this.user = user;
    this.user.is_customer = true;
  }

}
