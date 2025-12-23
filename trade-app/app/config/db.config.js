module.exports = {
  HOST: "localhost",
  USER: "postgres", 
  PASSWORD: "123456",
  DB: "trade-app-db",
  port: 5433,
  dialect: "postgres",
  logging: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};