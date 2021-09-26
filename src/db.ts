import { Pool } from "pg";

const connectionString = 'localhost:5432';

const db = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '01101998',
  database: 'auth_microservice'
});

export default db;