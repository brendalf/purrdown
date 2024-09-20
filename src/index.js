"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdown = exports.BlockType = void 0;
var BlockType;
(function (BlockType) {
    BlockType[BlockType["Empty"] = 0] = "Empty";
    BlockType[BlockType["Heading"] = 1] = "Heading";
    BlockType[BlockType["Image"] = 2] = "Image";
    BlockType[BlockType["Paragraph"] = 3] = "Paragraph";
    BlockType[BlockType["Note"] = 4] = "Note";
    BlockType[BlockType["Code"] = 5] = "Code";
})(BlockType || (exports.BlockType = BlockType = {}));
const parseMarkdown = (content) => {
    const lines = content.split("\n");
    const blocks = [];
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
            blocks.push({ type: BlockType.Heading, title, size });
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
            });
            continue;
        }
        const imageMatch = line.match(/!\[(.+)\]\((.+)\)/);
        if (imageMatch) {
            const alt = imageMatch[1].trim();
            const url = imageMatch[2].trim();
            blocks.push({ type: BlockType.Image, alt, url });
            continue;
        }
        if (line.startsWith(">")) {
            blocks.push({
                type: BlockType.Note,
                content: line.slice(1).trim(),
            });
            continue;
        }
        blocks.push({ type: BlockType.Paragraph, content: line });
    }
    return blocks;
};
exports.parseMarkdown = parseMarkdown;
