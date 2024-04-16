// config/configuration.ts
export default () => {
  return {
    APP_PORT: process.env.APP_PORT || 3000,
    DATABASE: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_DATABASE
    },
    REDIS:{
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      database:process.env.REDIS_DATABASE,
      ttl:parseInt(process.env.REDIS_DDL),
      password:process.env.REDIS_PASSWORD
    },
    JWT:{
      key:process.env.JWT_KEY,
      time:process.env.JWT_TIME,
    }
  }
};
