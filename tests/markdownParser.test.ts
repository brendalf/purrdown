import { parseMarkdown, BlockType, Block } from "../src/markdownParser";

describe("parseMarkdown", () => {
  it("should correctly parse markdown into blocks", () => {
    const markdown = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

> This is a note

![Alt text](image_url)

This is a paragraph.
    `.trim();

    const expectedBlocks: Block[] = [
      { type: BlockType.H1, content: "Heading 1" },
      { type: BlockType.H2, content: "Heading 2" },
      { type: BlockType.H3, content: "Heading 3" },
      { type: BlockType.H4, content: "Heading 4" },
      { type: BlockType.H5, content: "Heading 5" },
      { type: BlockType.H6, content: "Heading 6" },
      { type: BlockType.NOTE, content: "This is a note" },
      { type: BlockType.IMAGE, content: "![Alt text](image_url)" },
      { type: BlockType.PARAGRAPH, content: "This is a paragraph." },
    ];

    const result = parseMarkdown(markdown);
    expect(result).toEqual(expectedBlocks);
  });

  it("should handle empty lines as paragraphs", () => {
    const markdown = `
# Heading 1

This is a paragraph.

`.trim();

    const expectedBlocks: Block[] = [
      { type: BlockType.H1, content: "Heading 1" },
      { type: BlockType.PARAGRAPH, content: "" },
      { type: BlockType.PARAGRAPH, content: "This is a paragraph." },
      { type: BlockType.PARAGRAPH, content: "" },
    ];

    const result = parseMarkdown(markdown);
    expect(result).toEqual(expectedBlocks);
  });
});
