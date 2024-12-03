# Sapling And Contentful Template

This template demonstrates how to use Sapling with Contentful as a headless CMS.

## Setup

1. Create a new Contentful project
2. Create a new `post` content type with the following fields:

- `title`: `Text`
- `slug`: `Text`
- `publishedAt`: `Date`
- `featuredImage`: `Media`
- `body`: `Rich Text`

3. Use the `.env.example` file to create a `.env` file and add your Contentful space ID and access token

## Usage

```sh
deno task start
```

