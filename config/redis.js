import { createClient } from "redis";

export const redis = createClient();

redis.connect()
  .then(() => console.log("Redis conectado"))
  .catch(err => console.log("Error en Redis", err));
