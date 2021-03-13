import dev from "./dev.json";
import prod from "./prod.json";

interface Config {
  BASE_URL: string;
}

// @ts-ignore
const config: Config = import.meta.env.ENV === "prod" ? prod : dev;
export default config;
