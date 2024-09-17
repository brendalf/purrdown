import { parseMarkdown, Block } from "../src/markdownParser";

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

![Alt text](image_url)
![Alt text  
![Alt text]    
![Alt text]    (image_url
![Alt text]    (image_url)     

This is a paragraph.
    `.trim();

    const expectedBlocks: Block[] = [
      { title: "Heading 1", size: 1 },
      { title: "Heading 1", size: 1 },
      { title: "Heading 2", size: 2 },
      { title: "Heading 3", size: 3 },
      { title: "Heading 4", size: 4 },
      { title: "Heading 5", size: 5 },
      { title: "Heading 6", size: 6 },
      {},
      {
        script: "def main():\n  pass\n",
        language: "python",
      },
      {},
      { content: "This is a note" },
      {},
      { alt: "Alt text", url: "image_url" },
      { content: "![Alt text" },
      { content: "![Alt text]" },
      { content: "![Alt text]    (image_url" },
      { alt: "Alt text", url: "image_url" },
      {},
      { content: "This is a paragraph." },
    ];

    const result = parseMarkdown(markdown);
    expect(result).toEqual(expectedBlocks);
  });
});
