export interface Block {}
export interface Heading extends Block {
  title: string;
  size: number;
}
export interface Image extends Block {
  alt: string;
  url: string;
}
export interface Paragraph extends Block {
  content: string;
}
export interface Note extends Paragraph {}
export interface Code extends Block {
  script: string;
  language?: string;
}

export const parseMarkdown = (content: string): Block[] => {
  const lines = content.split("\n");
  const blocks: Block[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === "") {
      blocks.push({} as Block);
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s*(.*)/);
    if (headingMatch) {
      const size = headingMatch[1].length;
      const title = headingMatch[2].trim();
      blocks.push({ title, size } as Heading);
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      let script = "";
      i++;

      while (i < lines.length && !lines[i].startsWith("```")) {
        script += lines[i] + "\n";
        i++;
      }

      blocks.push({ script: script.trim(), language } as Code);
      continue;
    }

    const imageMatch = line.match(/!\[(.+)\]\((.+)\)/);
    if (imageMatch) {
      const alt = imageMatch[1].trim();
      const url = imageMatch[2].trim();
      blocks.push({ alt, url } as Image);
      continue;
    }

    if (line.startsWith(">")) {
      blocks.push({ content: line.slice(1).trim() } as Note);
      continue;
    }

    blocks.push({ content: line } as Paragraph);
  }

  return blocks;
};
