import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export async function richTextToHTML(document: any) {
  const html = await documentToHtmlString(document)
  return html
}