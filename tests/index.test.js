"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
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
        const expectedBlocks = [
            { type: index_1.BlockType.Heading, title: "Heading 1", size: 1 },
            { type: index_1.BlockType.Heading, title: "Heading 1", size: 1 },
            { type: index_1.BlockType.Heading, title: "Heading 2", size: 2 },
            { type: index_1.BlockType.Heading, title: "Heading 3", size: 3 },
            { type: index_1.BlockType.Heading, title: "Heading 4", size: 4 },
            { type: index_1.BlockType.Heading, title: "Heading 5", size: 5 },
            { type: index_1.BlockType.Heading, title: "Heading 6", size: 6 },
            { type: index_1.BlockType.Empty },
            {
                type: index_1.BlockType.Code,
                script: "def main():\n  pass",
                language: "python",
            },
            { type: index_1.BlockType.Empty },
            { type: index_1.BlockType.Note, content: "This is a note" },
            { type: index_1.BlockType.Empty },
            {
                type: index_1.BlockType.Image,
                alt: "Alt text",
                url: "https://example.com/image.png",
            },
            { type: index_1.BlockType.Paragraph, content: "![Alt text](" },
            { type: index_1.BlockType.Empty },
            {
                type: index_1.BlockType.Paragraph,
                content: "This is a paragraph.",
            },
        ];
        const result = (0, index_1.parseMarkdown)(markdown);
        expect(result).toEqual(expectedBlocks);
    });
});
