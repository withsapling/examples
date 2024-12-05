import { Sapling } from '@sapling/sapling'

import { router } from "./routes/router.ts";

const site = new Sapling();


router(site);

Deno.serve({
  port: 8080,
  onListen: () =>
    console.log(
      `\nSapling Server is running on %chttp://localhost:8080\n`,
      "color: green; font-weight: bold"
    ),
  handler: site.fetch,
});
