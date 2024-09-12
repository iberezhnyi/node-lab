import { HTTPResponseLogger } from "./HTTPResponseLogger";
import { HTTPRequestLogger } from "./HTTPRequestLogger";

type Middleware = typeof HTTPRequestLogger | typeof HTTPResponseLogger;

const middlewares = <Middleware[]>[HTTPRequestLogger, HTTPResponseLogger];

export { middlewares };
