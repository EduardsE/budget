import dev from "./dev.json";
import prod from "./prod.json";

interface Config {
  BASE_URL: string;
}

// @ts-ignore
const config: Config = process.env === "prod" ? prod : dev;
export default config;
