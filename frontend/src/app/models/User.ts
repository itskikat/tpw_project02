export class User {
  id: number;
  username: string;
  password: string;
  is_customer: boolean;
  is_manager: boolean;

  constructor(id: number, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.is_customer = false;
    this.is_manager = false;

  }
}
