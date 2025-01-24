import { site } from "./index.ts";

await site.generatePrerenderedPages("./dist");
Deno.exit(0);
