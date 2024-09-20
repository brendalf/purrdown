export enum BlockType {
  Empty,
  Heading,
  Image,
  Paragraph,
  Note,
  Code,
}
export interface Block {
  type: BlockType;
}
export interface Heading extends Block {
  type: BlockType;
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
      blocks.push({ type: BlockType.Empty });
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s*(.*)/);
    if (headingMatch) {
      const size = headingMatch[1].length;
      const title = headingMatch[2].trim();
      blocks.push({ type: BlockType.Heading, title, size } as Heading);
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

      blocks.push({
        type: BlockType.Code,
        script: script.trim(),
        language,
      } as Code);
      continue;
    }

    const imageMatch = line.match(/!\[(.+)\]\((.+)\)/);
    if (imageMatch) {
      const alt = imageMatch[1].trim();
      const url = imageMatch[2].trim();
      blocks.push({ type: BlockType.Image, alt, url } as Image);
      continue;
    }

    if (line.startsWith(">")) {
      blocks.push({
        type: BlockType.Note,
        content: line.slice(1).trim(),
      } as Note);
      continue;
    }

    blocks.push({ type: BlockType.Paragraph, content: line } as Paragraph);
  }

  return blocks;
};
