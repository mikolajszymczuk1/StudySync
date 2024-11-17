class User {
  id: number = -1;
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  createdAt: number = -1;

  constructor(
    id: number = -1,
    username: string = '',
    firstName: string = '',
    lastName: string = '',
    createdAt: number = -1,
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
  }

  public static createUserObject(data: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    createdAt: number;
  }): User {
    return new User(
      data.id,
      data.username,
      data.firstName,
      data.lastName,
      data.createdAt,
    );
  }
}

export default User;
