import { site } from "./index.js";

await site.buildPrerenderRoutes("./dist/prerendered");
process.exit(0);
