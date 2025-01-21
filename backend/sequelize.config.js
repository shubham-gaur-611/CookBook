module.exports = {
  development: {
    dialect: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'cookbook_password',
    database: 'cookbook_db',
    autoLoadModels: true,
  },
  test: {
    dialect: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'cookbook_password',
    database: 'cookbook_db',
    autoLoadModels: true,
  },
  production: {
    dialect: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'cookbook_password',
    database: 'cookbook_db',
    autoLoadModels: true,
  }
};
