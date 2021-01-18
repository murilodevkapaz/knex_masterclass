// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: "knex_test",
      user: "postgres",
      password: "123"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds:{
      directory: `${__dirname}/src/database/seeds`
    }
  },
  onUpdatedTrigger: (table) => `
  CREATE TRIGGER ${table}_updated_at
  BEFORE UPDATE ON ${table}
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
  `
};

//onUpdatedTrigger para automatizar a procedure
