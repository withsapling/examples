import { site } from "./index.js";

await site.generatePrerenderedPages("./dist/prerendered");
process.exit(0);
