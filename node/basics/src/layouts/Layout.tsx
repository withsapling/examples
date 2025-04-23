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
  additionalHead?: string;
};

export default async function Layout(props: BaseLayoutProps) {
  const defaultHeadContent = BaseHead({
    title: props.title,
    description: props.description,
  });

  const combinedHead = html`
    ${defaultHeadContent}
    ${props.additionalHead || ''}
  `;

  return await SaplingLayout({
    enableIslands: true,
    unoConfig: config,
    head: combinedHead,
    bodyClass: props.bodyClass || `font-sans @dark:bg-black @dark:text-white`,
    children: props.children,
  });
}
