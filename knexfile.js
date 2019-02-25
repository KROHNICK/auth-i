// Update with your config settings.

module.exports = {
  useNullAsDefault: true,
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/dev.sqlite3"
    }
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    }
  },
  migrations: {
    directory: "./data/migrations"
  }
};
