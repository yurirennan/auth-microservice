import User from "../models/User";
import db from "../db";

class UsersRepository {
  async createUser(username: string, password: string): Promise<User> {
    const query = `
      INSERT INTO auth_users (
        username,
        password
      ) VALUES (
        $1, crypt($2, $3)
      )
      RETURNING id, username
    `;

    const { rows } = await db.query(query, [username, password, 'my_salt']);
    const [ user ] = rows;
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const query = `
      SELECT id, username
      FROM auth_users
    `;

    const { rows } = await db.query<User>(query);
    return rows;
  }

  async updateUser(id: string, username: string, password: string): Promise<User>{
    const query = `
      UPDATE auth_users
      SET username = $2, password = crypt($3, 'my_salt')
      WHERE id = $1
      RETURNING id, username
    `;

    const { rows } = await db.query(query, [id, username, password]);
    const [ user ] = rows;

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const query = `
      DELETE
      FROM auth_users
      WHERE id = $1
    `;

    await db.query(query, [id]);
  }

  async findUserById(id: string): Promise<User> {
    const query = `
      SELECT id, username
      FROM auth_users
      WHERE id = $1
    `;

    const { rows } = await db.query<User>(query, [ id ]);
    const [ user ] = rows;

    return user;
  }

  async findUserByUsernameAndPassword(username: string, password: string): Promise<User | null> {
    const query = `
      SELECT id, username
      FROM auth_users
      WHERE username = $1 AND password = crypt($2, 'my_salt')
    `;

    const { rows } = await db.query<User>(query, [ username, password ]);
    const [ user ] = rows;

    return !user ? null : user;
  }
}

export default UsersRepository;