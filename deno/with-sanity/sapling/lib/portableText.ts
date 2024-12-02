import { toHTML } from '@portabletext/to-html'

// convert Portable Text to HTML
export async function portableTextToHTML(portableTextBlocks: any) {
  const html = await toHTML(portableTextBlocks, {})
  console.log(html)
  return html
}
