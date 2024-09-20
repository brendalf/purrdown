import {
  parseMarkdown,
  Block,
  BlockType,
  Heading,
  Code,
  Note,
  Image,
  Paragraph,
} from "../src/markdownParser";

describe("parseMarkdown", () => {
  it("should correctly parse markdown into blocks", () => {
    const markdown = `
# Heading 1
#       Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

\`\`\`python
def main():
  pass
\`\`\`

> This is a note

![Alt text](https://example.com/image.png)
![Alt text](

This is a paragraph.
    `.trim();

    const expectedBlocks: Block[] = [
      { type: BlockType.Heading, title: "Heading 1", size: 1 } as Heading,
      { type: BlockType.Heading, title: "Heading 1", size: 1 } as Heading,
      { type: BlockType.Heading, title: "Heading 2", size: 2 } as Heading,
      { type: BlockType.Heading, title: "Heading 3", size: 3 } as Heading,
      { type: BlockType.Heading, title: "Heading 4", size: 4 } as Heading,
      { type: BlockType.Heading, title: "Heading 5", size: 5 } as Heading,
      { type: BlockType.Heading, title: "Heading 6", size: 6 } as Heading,
      { type: BlockType.Empty },
      {
        type: BlockType.Code,
        script: "def main():\n  pass",
        language: "python",
      } as Code,
      { type: BlockType.Empty },
      { type: BlockType.Note, content: "This is a note" } as Note,
      { type: BlockType.Empty },
      {
        type: BlockType.Image,
        alt: "Alt text",
        url: "https://example.com/image.png",
      } as Image,
      { type: BlockType.Paragraph, content: "![Alt text](" } as Paragraph,
      { type: BlockType.Empty },
      {
        type: BlockType.Paragraph,
        content: "This is a paragraph.",
      } as Paragraph,
    ];

    const result = parseMarkdown(markdown);
    expect(result).toEqual(expectedBlocks);
  });
});
