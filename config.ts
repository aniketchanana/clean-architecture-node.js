const localConfig = {
  PORT: 8000,
  JWT: "Token secret",
  CONNECTION_URL: "mongodb://0.0.0.0:27017/todo-app",
  ENCRYPTION_PASSWORD: "encrypt password",
  CLIENT_URL: "http://localhost:3000",
  NODE_ENV: "development",
};

const config = localConfig;

export default config;
