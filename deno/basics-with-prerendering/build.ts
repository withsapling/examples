import { site } from "./index.ts";

// this is the build script to prerender your .prerender() routes
// run deno task build to prerender your pages into the ./dist directory
// you can obviously add other build optimizations here as needed
await site.generatePrerenderedPages("./dist");
Deno.exit(0);
