# Sapling & Sanity

## Setup

1. Create a new Sanity project and get the project ID
2. Update the `sanity.config.ts` and `sanity.cli.ts` with your project ID
3. Run `npx sanity login` and login with your Sanity account
4. Run `npx sanity init` to initialize the studio
5. Add some sample content to the studio
6. Update the `sapling/lib/sanityClient.ts` file with your project ID

## Run Sanity Studio

```bash
cd sanity
npm run dev
```

## Run Sapling

```bash
cd sapling
deno task dev
```
