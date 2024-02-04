// config/configuration.ts
export default () => {
  return {
    APP_PORT: process.env.APP_PORT || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
  }
};
