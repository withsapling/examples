import {
  Layout as SaplingLayout,
  type LayoutProps,
} from "@sapling/sapling";
import { html } from "hono/html";
import { BaseHead } from "../components/BaseHead.js";
import { config } from "../uno.config.js";

export type BaseLayoutProps = LayoutProps & {
  title?: string;
  description?: string;
};

export default async function Layout(props: BaseLayoutProps) {
  return await SaplingLayout({
    stream: true,
    enableIslands: true,
    unoConfig: config,
    head: html`${await BaseHead({
      title: props.title,
      description: props.description,
    })}
    ${await props.head}`,
    bodyClass: `font-sans @dark:bg-black @dark:text-white ${
      props.bodyClass ?? ``
    }`,
    children: props.children,
  });
}
