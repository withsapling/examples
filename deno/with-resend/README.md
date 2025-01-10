# Sapling & Resend

A simple Sapling app that sends an email using Resend's Email API.

The email template in `Email.tsx` is built using the React Email from Resend.

Learn more about Resend: https://resend.com/docs

Learn more about Sapling: https://sapling.land/docs

Learn more about the React Email: https://react.email/

## Usage

1. Create a Resend account [here](https://resend.com) and get an API key.
2. Create a `.env` file based on the `.env.example` file and add your Resend API key.

```
deno task dev
```

Fill out the form to send yourself an email.
