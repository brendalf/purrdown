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
    let line = lines[i].trim();

    if (line == "") {
      blocks.push({});
      continue;
    }

    if (line.startsWith("######")) {
      blocks.push({ title: line.slice(6).trim(), size: 6 });
      continue;
    }

    if (line.startsWith("#####")) {
      blocks.push({ title: line.slice(5).trim(), size: 5 });
      continue;
    }

    if (line.startsWith("####")) {
      blocks.push({ title: line.slice(4).trim(), size: 4 });
      continue;
    }

    if (line.startsWith("###")) {
      blocks.push({ title: line.slice(3).trim(), size: 3 });
      continue;
    }

    if (line.startsWith("##")) {
      blocks.push({ title: line.slice(2).trim(), size: 2 });
      continue;
    }

    if (line.startsWith("#")) {
      blocks.push({ title: line.slice(1).trim(), size: 1 });
      continue;
    }

    if (line.startsWith("```")) {
      let language = line.slice(3).trim();
      let script = "";

      let j = i + 1;
      while (!lines[j].trim().startsWith("```")) {
        script += lines[j] + "\n";
        j++;
      }

      i = j;

      blocks.push({ script: script, language: language });
      continue;
    }

    if (line.startsWith("![")) {
      let alt = "";
      let url = "";

      let max = line.length;
      let j = 2;

      while (line[j] != "]" && j < max) {
        alt += line[j];
        j++;
      }

      if (j == max) {
        blocks.push({ content: line });
        continue;
      }

      while (line[j] != "(" && j < max) {
        j++;
      }

      if (j == max) {
        blocks.push({ content: line });
        continue;
      }

      j++;

      while (line[j] != ")" && j < max) {
        url += line[j];
        j++;
      }

      if (j == max) {
        blocks.push({ content: line });
        continue;
      }

      blocks.push({ alt: alt, url: url });
      continue;
    }

    if (line.startsWith(">")) {
      blocks.push({ content: line.slice(1).trim() });
      continue;
    }

    blocks.push({ content: line.slice(0).trim() });
  }

  return blocks;
};
