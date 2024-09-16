export enum BlockType {
  H6,
  H5,
  H4,
  H3,
  H2,
  H1,
  NOTE,
  PARAGRAPH,
  IMAGE,
}

export type Block = {
  type: BlockType;
  content: string;
};

export const defineBlocks = (line: string): Block => {
  if (line.startsWith("######")) {
    return { type: BlockType.H6, content: line.slice(6).trimStart() };
  } else if (line.startsWith("#####")) {
    return { type: BlockType.H5, content: line.slice(5).trimStart() };
  } else if (line.startsWith("####")) {
    return { type: BlockType.H4, content: line.slice(4).trimStart() };
  } else if (line.startsWith("###")) {
    return { type: BlockType.H3, content: line.slice(3).trimStart() };
  } else if (line.startsWith("##")) {
    return { type: BlockType.H2, content: line.slice(2).trimStart() };
  } else if (line.startsWith("#")) {
    return { type: BlockType.H1, content: line.slice(1).trimStart() };
  } else if (line.startsWith("![")) {
    return { type: BlockType.IMAGE, content: line.trimStart() };
  } else if (line.startsWith(">")) {
    return { type: BlockType.NOTE, content: line.slice(1).trimStart() };
  } else {
    return { type: BlockType.PARAGRAPH, content: line.trimStart() };
  }
};

export const parseMarkdown = (content: string): Block[] => {
  return content.split("\n").map(defineBlocks);
};
