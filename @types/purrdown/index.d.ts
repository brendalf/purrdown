import { Block } from "../../src";

declare module "@purrdown" {
  export function parseMarkdown(content: string): Block[];
}
