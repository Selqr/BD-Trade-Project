module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "trade-app",
  PASSWORD: process.env.DB_PASSWORD || "123",
  DB: process.env.DB_NAME || "trade-app-db",
  port: process.env.DB_PORT || 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};