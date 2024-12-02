# Sapling & Deno with an embedded React Single Page App

This is an example of how to use Sapling with Deno to serve an embedded React Single Page App. Notice that the Sapling project is what you would normally see and then in the `app` directory is the React Single Page App. This mean you could build a full, client side rendered React app and then embed it in a Sapling project.

This same concept could be translated to any other SPA setup with Vite.

## Why?

1. You could use Sapling for your marketing site because of the SEO and performance benefits but embed a React Single Page App for the dashboard/SaaS part of your product.

2. You might want to embed a CMS or other client side rendered app inside of a Sapling project.
 

## Usage

Run the Sapling project:

```
deno task dev
```

Run the React Single Page App:

```
cd app
npm run dev
```

Build and embed the React Single Page App:

```
deno task build
```

This will run the `embed-app.ts` script which will build the React Single Page App and copy the files to the static directory.
