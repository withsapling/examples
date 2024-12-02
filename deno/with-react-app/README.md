# Sapling & Deno with an embedded React Single Page App

This is an example of how to use Sapling with Deno to serve an embedded React Single Page App. Notice that the Sapling project is what you would normally see and then in the `app` directory is the React App. This mean you could build a full, client side rendered React app and then embed it in a Sapling project.

This same concept could be translated to any other SPA setup with Vite.

## Why?

1. You could use Sapling for your marketing site because of the SEO and performance benefits but embed a React App for the dashboard/SaaS part of your product.

2. You might want to embed a CMS or an internal tool that is client side rendered inside of a Sapling project.

3. You want to use Sapling for your API and a couple of SSR pages and then serve a React App on the frontend.

## Usage

Run the Sapling project:

```
deno task dev
```

Run the React App:

```
cd app
npm install
npm run dev
```
  
Build and embed the React App:

```
deno task build
```

This will run the `embed-app.ts` script which will build the React App and copy the files to the static directory.
