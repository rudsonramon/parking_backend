module.exports = [
  (development: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'admin',
    password: 'admin',
    database: 'condominium',
    operatorsAliases: false,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  })void 0,
];
