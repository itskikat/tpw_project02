import {User} from "./User";

export class Manager {
  user: User;

  constructor(user: User) {
    this.user = user;
    this.user.is_manager = true;
  }

}
